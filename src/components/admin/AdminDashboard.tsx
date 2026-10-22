import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  BookOpen,
  ArrowLeft,
  Search,
  Lock,
  Unlock,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import {
  api,
  type User,
  type Course,
  type ApiLesson,
  type ApiVocabulary,
} from '../../services/api';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

interface AdminDashboardProps {
  onBackToApp: () => void;
  currentUser: User;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToApp,
  currentUser,
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'lessons'>('users');

  // --- Users State ---
  const [users, setUsers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // --- Courses & Lessons State ---
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
  const [lessons, setLessons] = useState<ApiLesson[]>([]);
  const [isLoadingLessons, setIsLoadingLessons] = useState(false);
  const [expandedLessonId, setExpandedLessonId] = useState<number | null>(null);

  // --- Modal States ---
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<ApiLesson | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');

  const [isVocabModalOpen, setIsVocabModalOpen] = useState(false);
  const [vocabLessonId, setVocabLessonId] = useState<number | null>(null);
  const [editingVocab, setEditingVocab] = useState<ApiVocabulary | null>(null);
  const [vocabWord, setVocabWord] = useState('');
  const [vocabMeaning, setVocabMeaning] = useState('');
  const [vocabPos, setVocabPos] = useState('v');
  const [vocabIpa, setVocabIpa] = useState('');
  const [vocabEnSentence, setVocabEnSentence] = useState('');
  const [vocabViSentence, setVocabViSentence] = useState('');

  const [feedbackMsg, setFeedbackMsg] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  // --- Fetch Users ---
  const loadUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const res = await api.adminGetUsers({
        search: userSearch,
        role: userRoleFilter,
      });
      setUsers(res.users);
    } catch (err: any) {
      showFeedback('error', err.message || 'Không thể tải danh sách user');
    } finally {
      setIsLoadingUsers(false);
    }
  }, [userSearch, userRoleFilter]);

  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    }
  }, [activeTab, loadUsers]);

  // --- Fetch Courses & Lessons ---
  const loadCourses = useCallback(async () => {
    try {
      const list = await api.getCourses();
      setCourses(list);
      if (list.length > 0 && !selectedCourseId) {
        setSelectedCourseId(list[0].id);
      }
    } catch (err: any) {
      console.error(err);
    }
  }, [selectedCourseId]);

  const loadLessons = useCallback(async (courseId: number) => {
    setIsLoadingLessons(true);
    try {
      const list = await api.getLessons(courseId);
      setLessons(list);
    } catch (err: any) {
      showFeedback('error', err.message || 'Không thể tải danh sách bài học');
    } finally {
      setIsLoadingLessons(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    if (selectedCourseId) {
      loadLessons(selectedCourseId);
    }
  }, [selectedCourseId, loadLessons]);

  // --- User Actions ---
  const handleToggleStatus = async (user: User) => {
    if (user.id === currentUser.id) {
      alert('Bạn không thể tự khóa tài khoản của chính mình!');
      return;
    }
    try {
      await api.adminToggleUserStatus(user.id);
      showFeedback(
        'success',
        `Đã ${user.isActive ? 'khóa' : 'mở khóa'} user ${user.email}`,
      );
      loadUsers();
    } catch (err: any) {
      showFeedback('error', err.message || 'Thao tác thất bại');
    }
  };

  const handleToggleRole = async (user: User) => {
    if (user.id === currentUser.id) {
      alert('Bạn không thể tự hạ quyền của chính mình!');
      return;
    }
    const nextRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
    const confirmChange = window.confirm(
      `Bạn có chắc chắn muốn đổi quyền của ${user.email} sang ${nextRole}?`,
    );
    if (!confirmChange) return;

    try {
      await api.adminUpdateUserRole(user.id, nextRole);
      showFeedback('success', `Đã cập nhật role thành ${nextRole}`);
      loadUsers();
    } catch (err: any) {
      showFeedback('error', err.message || 'Thao tác thất bại');
    }
  };

  // --- Lesson Actions ---
  const openCreateLessonModal = () => {
    setEditingLesson(null);
    setLessonTitle('');
    setLessonDesc('');
    setIsLessonModalOpen(true);
  };

  const openEditLessonModal = (lesson: ApiLesson) => {
    setEditingLesson(lesson);
    setLessonTitle(lesson.title);
    setLessonDesc(lesson.description || '');
    setIsLessonModalOpen(true);
  };

  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingLesson) {
        await api.adminUpdateLesson(editingLesson.id, {
          title: lessonTitle,
          description: lessonDesc,
        });
        showFeedback('success', 'Đã cập nhật bài học!');
      } else {
        await api.adminCreateLesson({
          courseId: selectedCourseId,
          title: lessonTitle,
          description: lessonDesc,
        });
        showFeedback('success', 'Đã tạo bài học mới!');
      }
      setIsLessonModalOpen(false);
      loadLessons(selectedCourseId);
    } catch (err: any) {
      showFeedback('error', err.message || 'Lỗi lưu bài học');
    }
  };

  const handleDeleteLesson = async (lesson: ApiLesson) => {
    const confirmDel = window.confirm(
      `Xóa bài học "${lesson.title}" sẽ xóa toàn bộ từ vựng bên trong bài này. Bạn có chắc không?`,
    );
    if (!confirmDel) return;

    try {
      await api.adminDeleteLesson(lesson.id);
      showFeedback('success', 'Đã xóa bài học thành công');
      loadLessons(selectedCourseId);
    } catch (err: any) {
      showFeedback('error', err.message || 'Xóa thất bại');
    }
  };

  // --- Vocab Actions ---
  const toggleExpandLesson = async (lessonId: number) => {
    if (expandedLessonId === lessonId) {
      setExpandedLessonId(null);
      return;
    }
    setExpandedLessonId(lessonId);
    try {
      const detailed = await api.getLesson(lessonId);
      setLessons((prev) => prev.map((l) => (l.id === lessonId ? detailed : l)));
    } catch (err: any) {
      console.error(err);
    }
  };

  const openAddVocabModal = (lessonId: number) => {
    setVocabLessonId(lessonId);
    setEditingVocab(null);
    setVocabWord('');
    setVocabMeaning('');
    setVocabPos('v');
    setVocabIpa('');
    setVocabEnSentence('');
    setVocabViSentence('');
    setIsVocabModalOpen(true);
  };

  const openEditVocabModal = (vocab: ApiVocabulary) => {
    setVocabLessonId(vocab.lessonId);
    setEditingVocab(vocab);
    setVocabWord(vocab.word);
    setVocabMeaning(vocab.meaning);
    setVocabPos(vocab.partOfSpeech || 'v');
    setVocabIpa(vocab.ipa || '');
    setVocabEnSentence(vocab.exampleSentence || '');
    setVocabViSentence(vocab.exampleTranslation || '');
    setIsVocabModalOpen(true);
  };

  const handleSaveVocab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vocabLessonId) return;

    try {
      if (editingVocab) {
        await api.adminUpdateVocabulary(editingVocab.id, {
          word: vocabWord,
          meaning: vocabMeaning,
          partOfSpeech: vocabPos,
          ipa: vocabIpa,
          exampleSentence: vocabEnSentence,
          exampleTranslation: vocabViSentence,
        });
        showFeedback('success', 'Đã cập nhật từ vựng!');
      } else {
        await api.adminCreateVocabulary({
          lessonId: vocabLessonId,
          word: vocabWord,
          meaning: vocabMeaning,
          partOfSpeech: vocabPos,
          ipa: vocabIpa,
          exampleSentence: vocabEnSentence,
          exampleTranslation: vocabViSentence,
        });
        showFeedback('success', 'Đã thêm từ vựng mới!');
      }
      setIsVocabModalOpen(false);
      const detailed = await api.getLesson(vocabLessonId);
      setLessons((prev) =>
        prev.map((l) => (l.id === vocabLessonId ? detailed : l)),
      );
    } catch (err: any) {
      showFeedback('error', err.message || 'Lỗi lưu từ vựng');
    }
  };

  const handleDeleteVocab = async (vocab: ApiVocabulary) => {
    if (!window.confirm(`Xoá từ vựng "${vocab.word}"?`)) return;
    try {
      await api.adminDeleteVocabulary(vocab.id);
      showFeedback('success', 'Đã xóa từ vựng');
      const detailed = await api.getLesson(vocab.lessonId);
      setLessons((prev) =>
        prev.map((l) => (l.id === vocab.lessonId ? detailed : l)),
      );
    } catch (err: any) {
      showFeedback('error', err.message || 'Xóa từ vựng thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/80 bg-background/95 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToApp}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Về trang Flashcard
          </Button>
          <div className="h-4 w-[1px] bg-border" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h1 className="text-sm font-bold tracking-tight text-foreground sm:text-base">
              Admin Portal
            </h1>
            <Badge variant="purple" className="text-[10px]">
              QUẢN TRỊ VIÊN
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-bold text-foreground">
              {currentUser.email}
            </div>
            <div className="text-[10px] text-muted-foreground">
              Quyền:{' '}
              <strong className="text-purple-600">{currentUser.role}</strong>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl p-6">
        {/* Toast Feedback */}
        {feedbackMsg && (
          <Alert
            variant={feedbackMsg.type === 'success' ? 'success' : 'destructive'}
            className="animate-in zoom-in-95 mb-6"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs font-semibold">
              {feedbackMsg.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Tab Buttons */}
        <div className="mb-6 flex gap-2 border-b border-border pb-3">
          <Button
            variant={activeTab === 'users' ? 'default' : 'secondary'}
            onClick={() => setActiveTab('users')}
            className={`gap-2 rounded-xl text-xs font-bold ${
              activeTab === 'users'
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : ''
            }`}
          >
            <Users className="h-4 w-4" />
            Quản lý Người dùng ({users.length})
          </Button>
          <Button
            variant={activeTab === 'lessons' ? 'default' : 'secondary'}
            onClick={() => setActiveTab('lessons')}
            className={`gap-2 rounded-xl text-xs font-bold ${
              activeTab === 'lessons'
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : ''
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Quản lý Khoá học & Bài học
          </Button>
        </div>

        {/* TAB 1: USERS MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <Card>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm theo email, họ tên..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Select
                    value={userRoleFilter || 'ALL'}
                    onValueChange={(val) =>
                      setUserRoleFilter(val === 'ALL' ? '' : val)
                    }
                  >
                    <SelectTrigger className="w-[190px]">
                      <SelectValue placeholder="Tất cả vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Tất cả vai trò</SelectItem>
                      <SelectItem value="ADMIN">Chỉ ADMIN</SelectItem>
                      <SelectItem value="USER">Chỉ USER</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadUsers}
                    className="h-10"
                  >
                    Làm mới
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="overflow-hidden">
              {isLoadingUsers ? (
                <div className="flex items-center justify-center p-12 text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
                  Đang tải người dùng...
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Họ và Tên</TableHead>
                      <TableHead>Quyền</TableHead>
                      <TableHead>Từ đã thuộc</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="h-24 text-center text-muted-foreground"
                        >
                          Không tìm thấy người dùng nào.
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell className="font-mono text-muted-foreground">
                            #{u.id}
                          </TableCell>
                          <TableCell className="font-bold text-foreground">
                            {u.email}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {[u.lastName, u.firstName]
                              .filter(Boolean)
                              .join(' ') || '—'}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                u.role === 'ADMIN' ? 'purple' : 'success'
                              }
                            >
                              {u.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono">
                            {u.totalLearnedWords || 0} từ
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={u.isActive ? 'outline' : 'destructive'}
                              className={
                                u.isActive
                                  ? 'border-emerald-400/50 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                                  : ''
                              }
                            >
                              <span
                                className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                  u.isActive
                                    ? 'bg-emerald-500'
                                    : 'bg-destructive'
                                }`}
                              />
                              {u.isActive ? 'Hoạt động' : 'Đã khóa'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleToggleStatus(u)}
                                    className={
                                      u.isActive
                                        ? 'text-destructive hover:bg-destructive/10'
                                        : 'text-primary hover:bg-primary/10'
                                    }
                                  >
                                    {u.isActive ? (
                                      <Lock className="h-4 w-4" />
                                    ) : (
                                      <Unlock className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {u.isActive
                                    ? 'Khóa tài khoản'
                                    : 'Mở khóa tài khoản'}
                                </TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleToggleRole(u)}
                                    className="text-purple-600 hover:bg-purple-100/50 dark:hover:bg-purple-950/50"
                                  >
                                    <ShieldCheck className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Đổi quyền ADMIN / USER
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </Card>
          </div>
        )}

        {/* TAB 2: COURSES & LESSONS MANAGEMENT */}
        {activeTab === 'lessons' && (
          <div className="space-y-4">
            {/* Course Selector & Add Lesson */}
            <Card>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Label className="whitespace-nowrap text-xs font-bold text-muted-foreground">
                    Chọn Khoá học:
                  </Label>
                  <Select
                    value={selectedCourseId ? String(selectedCourseId) : ''}
                    onValueChange={(val) => setSelectedCourseId(Number(val))}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Chọn khoá học" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.title} ({c.level || c.targetScore}) —{' '}
                          {c.totalWords || 0} từ
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={openCreateLessonModal}
                  className="gap-1.5 bg-purple-600 text-white hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4" />
                  Thêm bài học mới
                </Button>
              </CardContent>
            </Card>

            {/* Lessons Accordion List */}
            {isLoadingLessons ? (
              <div className="flex items-center justify-center p-12 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
                Đang tải bài học...
              </div>
            ) : (
              <div className="space-y-3">
                {lessons.map((lesson) => {
                  const isExpanded = expandedLessonId === lesson.id;
                  const vocabCount =
                    lesson.vocabularies?.length ||
                    lesson._count?.vocabularies ||
                    0;

                  return (
                    <Card key={lesson.id} className="overflow-hidden">
                      {/* Lesson Row */}
                      <div className="flex items-center justify-between p-4">
                        <div
                          onClick={() => toggleExpandLesson(lesson.id)}
                          className="flex flex-1 cursor-pointer items-center gap-3"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-purple-600" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                                #{lesson.orderIndex || lesson.id}
                              </span>
                              <h3 className="text-sm font-bold text-foreground">
                                {lesson.title}
                              </h3>
                              <Badge
                                variant="secondary"
                                className="text-[10px]"
                              >
                                {vocabCount} từ vựng
                              </Badge>
                            </div>
                            {lesson.description && (
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {lesson.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Lesson Action Buttons */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openAddVocabModal(lesson.id)}
                            className="h-8 gap-1 text-xs text-primary hover:text-primary"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            Thêm từ
                          </Button>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditLessonModal(lesson)}
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Sửa bài học</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteLesson(lesson)}
                                className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Xóa bài học</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                      {/* Vocabularies Dropdown */}
                      {isExpanded && (
                        <div className="border-t border-border bg-muted/20 p-4">
                          <div className="mb-3 flex items-center justify-between text-xs font-bold text-foreground">
                            <span>Danh sách từ vựng trong bài</span>
                            <span className="text-[11px] font-normal text-muted-foreground">
                              (Sửa / xoá từ vựng nhanh bên phải)
                            </span>
                          </div>

                          {!lesson.vocabularies ||
                          lesson.vocabularies.length === 0 ? (
                            <div className="py-4 text-center text-xs text-muted-foreground">
                              Chưa có từ vựng nào trong bài này. Hãy bấm "Thêm
                              từ" ở góc trên.
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                              {lesson.vocabularies.map((v) => (
                                <Card
                                  key={v.id}
                                  className="flex items-start justify-between p-3 text-xs"
                                >
                                  <div>
                                    <div className="flex items-baseline gap-2">
                                      <strong className="text-sm font-bold text-foreground">
                                        {v.word}
                                      </strong>
                                      {v.partOfSpeech && (
                                        <span className="italic text-muted-foreground">
                                          ({v.partOfSpeech})
                                        </span>
                                      )}
                                      {v.ipa && (
                                        <span className="font-mono text-[11px] text-primary">
                                          {v.ipa}
                                        </span>
                                      )}
                                    </div>
                                    <div className="mt-0.5 text-foreground">
                                      {v.meaning}
                                    </div>
                                    {v.exampleSentence && (
                                      <div className="mt-1 text-[11px] italic text-muted-foreground">
                                        "{v.exampleSentence}"
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-1 pl-2">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => openEditVocabModal(v)}
                                          className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                        >
                                          <Edit2 className="h-3.5 w-3.5" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Sửa từ vựng
                                      </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleDeleteVocab(v)}
                                          className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                        >
                                          <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Xóa từ vựng
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: Lesson Create / Edit */}
      <Dialog open={isLessonModalOpen} onOpenChange={setIsLessonModalOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle>
              {editingLesson ? 'Sửa bài học' : 'Thêm bài học mới'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveLesson} className="space-y-3.5 pt-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tiêu đề bài học
              </Label>
              <Input
                type="text"
                required
                placeholder="VD: Airport & Check-in"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Mô tả ngắn gọn
              </Label>
              <Textarea
                rows={2}
                placeholder="VD: Từ vựng giao tiếp tại sân bay và thủ tục..."
                value={lessonDesc}
                onChange={(e) => setLessonDesc(e.target.value)}
              />
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsLessonModalOpen(false)}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                {editingLesson ? 'Lưu thay đổi' : 'Tạo bài học'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: Vocabulary Create / Edit */}
      <Dialog open={isVocabModalOpen} onOpenChange={setIsVocabModalOpen}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle>
              {editingVocab ? 'Sửa từ vựng' : 'Thêm từ vựng mới'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveVocab} className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Từ tiếng Anh
                </Label>
                <Input
                  type="text"
                  required
                  placeholder="VD: Boarding pass"
                  value={vocabWord}
                  onChange={(e) => setVocabWord(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nghĩa tiếng Việt
                </Label>
                <Input
                  type="text"
                  required
                  placeholder="VD: Thẻ lên máy bay"
                  value={vocabMeaning}
                  onChange={(e) => setVocabMeaning(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Loại từ (n, v, adj...)
                </Label>
                <Input
                  type="text"
                  placeholder="VD: n"
                  value={vocabPos}
                  onChange={(e) => setVocabPos(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Phiên âm IPA
                </Label>
                <Input
                  type="text"
                  placeholder="VD: /ˈbɔːrdɪŋ pæs/"
                  value={vocabIpa}
                  onChange={(e) => setVocabIpa(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Câu ví dụ tiếng Anh
              </Label>
              <Input
                type="text"
                placeholder="VD: Please show your boarding pass at the gate."
                value={vocabEnSentence}
                onChange={(e) => setVocabEnSentence(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Dịch câu ví dụ tiếng Việt
              </Label>
              <Input
                type="text"
                placeholder="VD: Vui lòng xuất trình thẻ lên máy bay tại cổng."
                value={vocabViSentence}
                onChange={(e) => setVocabViSentence(e.target.value)}
              />
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsVocabModalOpen(false)}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                {editingVocab ? 'Lưu thay đổi' : 'Thêm từ'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
