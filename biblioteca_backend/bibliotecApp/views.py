from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario, Libro, Prestamo, Resena
from .serializers import UsuarioSerializer, LibroSerializer, PrestamoSerializer, ResenaSerializer
from django.http import HttpResponse

# Create your views here.
def  bienvenida(resquest):  # primera vista
    return HttpResponse("<h1>Bienvenido a nuestra bibliotecApp!</h1>") 

class LibroListCreateView(APIView):
    def get(self, request):
        libros = Libro.objects.all()
        serializer = LibroSerializer(libros, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = LibroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PrestamoListCreateView(APIView):
    def get(self, request):
        prestamos = Prestamo.objects.all()
        serializer = PrestamoSerializer(prestamos, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = PrestamoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResenaListCreateView(APIView):
    def get(self, request):
        resenas = Resena.objects.all()
        serializer = ResenaSerializer(resenas, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ResenaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
