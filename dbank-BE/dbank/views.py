from .models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password


# signup view
@api_view(["POST"])
def signup(request):
    # Validate email uniqueness
    existing_user = User.objects.filter(email=request.data.get('email')).first()
    if existing_user:
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Continue with user creation if email is unique
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        # Hash the password before saving
        serializer.save(password=make_password(request.data['password']))

        return Response({"user" : serializer.data, "status": "success"}, status=status.HTTP_201_CREATED,)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def signin(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Check email
    user = User.objects.filter(email=email).first()
    if not user or not check_password(password, user.password):
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    serializer = UserSerializer(user)
    return Response({'user': serializer.data, "status": "success"})


# check balance
@api_view(["GET"])
def user_balance(request, email, format=None):
    user = User.objects.filter(email=email).first()
    if not user:
        return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'balance': user.balance}, status=status.HTTP_200_OK)

# deposit balance
@api_view(["PUT"])
def deposit_balance(request):
    email = request.data.get('email')
    user = User.objects.filter(email=email).first()
    if not user:
        return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    else:
        if(request.data.get('amount') < 0):
            return Response({"error": "Deposit amount cannot be negative"}, status=status.HTTP_400_BAD_REQUEST)
        user.balance += request.data.get('amount')
        user.save()
        return Response({'balance': user.balance}, status=status.HTTP_200_OK)

# withdraw balance    
@api_view(["PUT"])
def withdraw_balance(request):
    email = request.data.get('email')
    user = User.objects.filter(email=email).first()
    if not user:
        return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    else:
        if(request.data.get('amount') < 0):
            return Response({"error": "Withdraw amount cannot be negative"}, status=status.HTTP_400_BAD_REQUEST)
        if(user.balance < request.data.get('amount')):
            return Response({"error": "Insufficient balance"}, status=status.HTTP_400_BAD_REQUEST)
        user.balance -= request.data.get('amount')
        user.save()
        return Response({'balance': user.balance}, status=status.HTTP_200_OK)