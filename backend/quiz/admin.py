from django.contrib import admin
from .models import Student, Question, QuestionOption, Quiz, StudentQuiz
from django.forms import Textarea
from django.db import models

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('username', 'score', 'status')

class QuestionOptionInline(admin.TabularInline):
    model = QuestionOption
    extra = 4
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows': 2, 'style': 'width: 80%;'})},
    }

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'quiz')
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows': 2, 'style': 'width: 80%;'})},
    }
    inlines = [QuestionOptionInline]

@admin.register(QuestionOption)
class QuestionOptionAdmin(admin.ModelAdmin):
    list_display = ('question', 'option', 'is_correct')
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows': 2, 'style': 'width: 80%;'})},
    }

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ("name", "author", "date_created")
    inlines = [QuestionInline]

@admin.register(StudentQuiz)
class StudentQuizAdmin(admin.ModelAdmin):
    list_display = ("student", "quiz", "score", "date_taken")
    readonly_fields = ("date_taken",)


