from rest_framework import serializers
from .models import Usuario, Libro, Prestamo, Resena

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'nombre_completo']


class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = '_all_'


class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = '_all_'
        read_only_fields = ['fecha_prestamo']


class ResenaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resena
        fields = ['id', 'usuario', 'libro', 'comentario', 'calificacion']
        read_only_fields = ['fecha_creacion']
