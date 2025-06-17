const bcrypt = require('bcrypt');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');

const teacherRegister = async (req, res) => {
  try {
    const { name, email, password, school, teachSclass } = req.body;

    if (!name || !email || !password || !school || !teachSclass) {
      return res
        .status(400)
        .json({ error: 'All required fields must be provided' });
    }

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(409).json({ error: 'Teacher already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      school,
      teachSclass,
    });

    await newTeacher.save();
    return res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    console.error('❌ Error in teacherRegister:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const teacherLogIn = async (req, res) => {
  try {
    let teacher = await Teacher.findOne({ email: req.body.email });
    if (!teacher) return res.send({ message: 'Teacher not found' });

    const validated = await bcrypt.compare(req.body.password, teacher.password);
    if (!validated) return res.send({ message: 'Invalid password' });

    teacher = await teacher
      .populate('teachSubject', 'subName sessions')
      .populate('school', 'schoolName')
      .populate('teachSclass', 'sclassName');

    teacher.password = undefined;
    res.send(teacher);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({ school: req.params.id })
      .populate('teachSubject', 'subName')
      .populate('teachSclass', 'sclassName');

    if (!teachers.length) return res.send({ message: 'No teachers found' });

    const cleanTeachers = teachers.map((t) => ({
      ...t._doc,
      password: undefined,
    }));
    res.send(cleanTeachers);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTeacherDetail = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('teachSubject', 'subName sessions')
      .populate('school', 'schoolName')
      .populate('teachSclass', 'sclassName');

    if (!teacher) return res.send({ message: 'No teacher found' });

    teacher.password = undefined;
    res.send(teacher);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTeacherSubject = async (req, res) => {
  const { teacherId, teachSubject } = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { teachSubject },
      { new: true }
    );

    await Subject.findByIdAndUpdate(teachSubject, {
      teacher: updatedTeacher._id,
    });

    res.send(updatedTeacher);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

    await Subject.updateOne(
      { teacher: deletedTeacher._id },
      { $unset: { teacher: '' } }
    );

    res.send(deletedTeacher);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTeachers = async (req, res) => {
  try {
    const deleted = await Teacher.deleteMany({ school: req.params.id });
    res.send(deleted);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTeachersByClass = async (req, res) => {
  try {
    const deleted = await Teacher.deleteMany({ teachSclass: req.params.id });
    res.send(deleted);
  } catch (error) {
    res.status(500).json(error);
  }
};

const teacherAttendance = async (req, res) => {
  const { date, presentCount, absentCount } = req.body;

  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.send({ message: 'Teacher not found' });

    const formattedDate = new Date(date).toDateString();

    const existing = teacher.attendance.find(
      (a) => new Date(a.date).toDateString() === formattedDate
    );

    if (existing) {
      existing.presentCount = presentCount;
      existing.absentCount = absentCount;
    } else {
      teacher.attendance.push({ date, presentCount, absentCount });
    }

    const result = await teacher.save();
    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  teacherRegister,
  teacherLogIn,
  getTeachers,
  getTeacherDetail,
  updateTeacherSubject,
  deleteTeacher,
  deleteTeachers,
  deleteTeachersByClass,
  teacherAttendance,
};
