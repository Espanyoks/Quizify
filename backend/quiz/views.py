# from django.shortcuts import get_object_or_404
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from .models import Quiz, Question, Student, StudentQuiz
# from .serializers import QuizSerializer, QuestionSerializer, StudentQuizSerializer

# @api_view(['GET'])
# def quizzes(request):
#     quizzes = Quiz.objects.all()
#     serializer = QuizSerializer(quizzes, many=True)
#     return Response(serializer.data)


# @api_view(['GET'])
# def questions(request, quiz_id):
#     questions = Question.objects.filter(quiz_id=quiz_id)
#     serializer = QuestionSerializer(questions, many=True)
#     return Response(serializer.data)


# @api_view(['POST'])
# def has_taken_quiz(request):
#     """
#     For unlimited retakes we always allow proceeding.
#     Frontend may send { username, quiz_id } — we'll still normalize username.
#     """
#     username = (request.data.get("username") or "").upper()
#     if not username:
#         return Response({"error": "username is required"}, status=400)

#     # ensure Student exists (create if missing)
#     student, created = Student.objects.get_or_create(username=username)
#     # Since retakes are allowed, always allow
#     return Response({"message": "Proceed to take your quiz"})


# @api_view(['POST'])
# def submit_quiz(request):
#     """
#     Expects JSON: { username, quiz_id, score }
#     Creates a new StudentQuiz object for each submission (unlimited retakes).
#     """
#     username = (request.data.get("username") or "").upper()
#     quiz_id = request.data.get("quiz_id")
#     score = request.data.get("score")

#     if not username or quiz_id is None or score is None:
#         return Response({"error": "username, quiz_id and score are required"}, status=400)

#     student, _ = Student.objects.get_or_create(username=username)
#     quiz = get_object_or_404(Quiz, pk=quiz_id)

#     # create a new attempt
#     attempt = StudentQuiz.objects.create(student=student, quiz=quiz, score=score)

#     serializer = StudentQuizSerializer(attempt)
#     return Response({"message": "Quiz submitted successfully!", "attempt": serializer.data})
