from django.urls import path
from . import views

urlpatterns = [
    path("quizzes/", views.quizzes, name="quizzes"),
    path("questions/<int:quiz_id>/", views.questions, name="questions_by_quiz"),
    path("has_taken_quiz/", views.has_taken_quiz, name="has_taken_quiz"),
    path("submit_quiz/", views.submit_quiz, name="submit_quiz"),
]
