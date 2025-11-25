from django.db import models

class Quiz(models.Model):
    name = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Quiz"
        verbose_name_plural = "Quizzes"


class Student(models.Model):
    username = models.CharField(max_length=20, unique=True)
    score = models.IntegerField(default=0)   # legacy / optional
    status = models.CharField(max_length=20, default="active")  # legacy / optional

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "Student"
        verbose_name_plural = "Students"


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    question = models.CharField(max_length=500)

    def __str__(self):
        return self.question

    class Meta:
        verbose_name = "Question"
        verbose_name_plural = "Questions"


class QuestionOption(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    option = models.CharField(max_length=300)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.option} for {self.question.question}"

    class Meta:
        verbose_name = "Question Option"
        verbose_name_plural = "Question Options"


class StudentQuiz(models.Model):
    """
    Stores each attempt (unlimited retakes).
    """
    student = models.ForeignKey(Student, related_name="attempts", on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, related_name="attempts", on_delete=models.CASCADE)
    score = models.IntegerField()
    date_taken = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.quiz.name} - {self.score}"

    class Meta:
        verbose_name = "Student Quiz Attempt"
        verbose_name_plural = "Student Quiz Attempts"
        ordering = ["-date_taken"]
