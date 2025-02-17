from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

# Create your models here.
class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    nombre_completo = models.CharField(max_length=150)

    #Evitar conflictos en las relaciones many-to-many
    groups = models.ManyToManyField(
        Group,
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name='usuario_set',    # nombre unico para evitar conflictos
        related_query_name='usuario',
    )

    user_permissions = models.ManyToManyField(
        Permission,
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
        related_name='usuario_set',
        related_query_name='usuario',
    )

    def __str__(self):
        return self.username

class Libro(models.Model):
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=200)
    fecha_publicacion = models.DateField()
    editorial = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.titulo} - {self.autor}"


class Prestamo(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='reseñas')
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE, related_name='reseñas')
    fecha_prestamo = models.DateField(auto_now_add=True)
    fecha_devolucion = models.DateField(null=True, blank=True)
    devuelto = models.BooleanField(default=False)

class Resena(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='resena')
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE, related_name='resena')
    comentario = models.TextField()
    calificacion = models.PositiveSmallIntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f" Reseña de {self.usuario.username} - {self.libro.titulo}"




    
