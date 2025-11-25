from rest_framework import serializers
from .models import Quiz, Question, QuestionOption, Student, StudentQuiz

class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = ['id', 'option', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    options = QuestionOptionSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ['id', 'quiz', 'question', 'options']

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'name', 'author', 'date_created']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'username', 'score', 'status']

class StudentQuizSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    quiz = QuizSerializer(read_only=True)

    class Meta:
        model = StudentQuiz
        fields = ['id', 'student', 'quiz', 'score', 'date_taken']
