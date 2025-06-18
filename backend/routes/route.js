const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const {
  adminRegister,
  adminLogIn,
  getAdminDetail,
} = require('../controllers/admin-controller.js');

const {
  sclassCreate,
  sclassList,
  deleteSclass,
  deleteSclasses,
  getSclassDetail,
  getSclassStudents,
} = require('../controllers/class-controller.js');
const {
  complainCreate,
  complainList,
} = require('../controllers/complain-controller.js');
const {
  noticeCreate,
  noticeList,
  deleteNotices,
  deleteNotice,
  updateNotice,
} = require('../controllers/notice-controller.js');
const {
  studentRegister,
  studentLogIn,
  getStudents,
  getStudentDetail,
  deleteStudents,
  deleteStudent,
  updateStudent,
  studentAttendance,
  deleteStudentsByClass,
  updateExamResult,
  clearAllStudentsAttendanceBySubject,
  clearAllStudentsAttendance,
  removeStudentAttendanceBySubject,
  removeStudentAttendance,
} = require('../controllers/student_controller.js');
const {
  subjectCreate,
  classSubjects,
  deleteSubjectsByClass,
  getSubjectDetail,
  deleteSubject,
  freeSubjectList,
  allSubjects,
  deleteSubjects,
} = require('../controllers/subject-controller.js');
const {
  teacherRegister,
  teacherLogIn,
  getTeachers,
  getTeacherDetail,
  deleteTeachers,
  deleteTeachersByClass,
  deleteTeacher,
  updateTeacherSubject,
  teacherAttendance,
} = require('../controllers/teacher-controller.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get('/Admin/:id', getAdminDetail);
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', async (req, res) => {
  try {
    console.log('Incoming payload:', req.body);

    const { name, rollNum, password, sclassName, school } = req.body;

    // Validate input
    if (!name || !rollNum || !password || !sclassName || !school) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Convert string IDs to MongoDB ObjectIds
    const classId = mongoose.Types.ObjectId(sclassName);
    const schoolId = mongoose.Types.ObjectId(school);

    // Create new student using converted ObjectIds
    const newStudent = new Student({
      name,
      rollNum,
      password,
      sclassName: classId,
      school: schoolId,
    });

    await newStudent.save();

    res.status(200).json({ message: 'Student registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/StudentLogin', studentLogIn);

router.get('/Students/:id', getStudents);
router.get('/Student/:id', getStudentDetail);

router.delete('/Students/:id', deleteStudents);
router.delete('/StudentsClass/:id', deleteStudentsByClass);
router.delete('/Student/:id', deleteStudent);

router.put('/Student/:id', updateStudent);

router.put('/UpdateExamResult/:id', updateExamResult);

router.put('/StudentAttendance/:id', studentAttendance);

router.put(
  '/RemoveAllStudentsSubAtten/:id',
  clearAllStudentsAttendanceBySubject
);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance);

// Teacher

router.post('/TeacherReg', async (req, res) => {
  try {
    const { name, email, password, school, teachSubject, teachSclass } =
      req.body;

    // Validate that required ObjectIds are valid
    if (
      !mongoose.Types.ObjectId.isValid(school) ||
      !mongoose.Types.ObjectId.isValid(teachSclass) ||
      (teachSubject && !mongoose.Types.ObjectId.isValid(teachSubject))
    ) {
      return res.status(400).json({ error: 'Invalid ID(s) provided' });
    }

    const newTeacher = new Teacher({
      name,
      email,
      password,
      school: new mongoose.Types.ObjectId(school),
      teachSubject: teachSubject
        ? new mongoose.Types.ObjectId(teachSubject)
        : undefined,
      teachSclass: new mongoose.Types.ObjectId(teachSclass),
    });

    await newTeacher.save();

    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (err) {
    console.error('TeacherReg error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/TeacherLogin', teacherLogIn);

router.get('/Teachers/:id', getTeachers);
router.get('/Teacher/:id', getTeacherDetail);

router.delete('/Teachers/:id', deleteTeachers);
router.delete('/TeachersClass/:id', deleteTeachersByClass);
router.delete('/Teacher/:id', deleteTeacher);

router.put('/TeacherSubject', updateTeacherSubject);

router.post('/TeacherAttendance/:id', teacherAttendance);

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete('/Notices/:id', deleteNotices);
router.delete('/Notice/:id', deleteNotice);

router.put('/Notice/:id', updateNotice);

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Sclass

router.post('/SclassCreate', sclassCreate);

router.get('/SclassList/:id', sclassList);
router.get('/Sclass/:id', getSclassDetail);

router.get('/Sclass/Students/:id', getSclassStudents);

router.delete('/Sclasses/:id', deleteSclasses);
router.delete('/Sclass/:id', deleteSclass);

// Subject

router.post('/SubjectCreate', subjectCreate);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get('/Subject/:id', getSubjectDetail);

router.delete('/Subject/:id', deleteSubject);
router.delete('/Subjects/:id', deleteSubjects);
router.delete('/SubjectsClass/:id', deleteSubjectsByClass);

module.exports = router;
