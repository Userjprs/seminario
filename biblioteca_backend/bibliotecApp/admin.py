from django.contrib import admin
from .models import Usuario, Libro, Prestamo, Resena

# Register your models here.

# Registra el modelo usuario
@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    # campos que se mostraran en la lista
    list_display = ('username', 'email', 'nombre_completo')
    # permite buscar por estos campos
    search_field = ('username', 'email')

# Registra el modelo libro
@admin.register(Libro)
class LibroAdmin(admin.ModelAdmin):
    # campos que se mostraran en la lista
    list_display = ('titulo', 'autor', 'fecha_publicacion', 'editorial')
    # filtra por genero y disponibilidad
    list_filter = ('titulo', 'autor', 'fecha_publicacion', 'editorial')
    # permite buscar por titulo o autor
    search_field = ('titulo', 'autor')

# Registra el modelo prestamo
@admin.register(Prestamo)
class PrestamoAdmin(admin.ModelAdmin):
    # campos visibles
    list_display = ('usuario', 'libro', 'fecha_prestamo', 'fecha_devolucion')
    # filtrar por fechas
    list_filter = ('fecha_prestamo', 'fecha_devolucion')
    # permite buscar por usuario y libro
    search_field = ('usuario__username', 'libro__titulo')

# Registra el modelo Reseña
@admin.register(Resena)
class ResenaAdmin(admin.ModelAdmin):
    # campos visibles
    list_display = ('usuario', 'libro', 'calificacion', 'fecha_creacion')
    # filtrar por calificacion y fecha
    list_filter = ('calificacion', 'fecha_creacion')
    # busqueda por usuario, libro o comentario
    search_fields = ('usuario__username', 'libro__titulo', 'comentario')
