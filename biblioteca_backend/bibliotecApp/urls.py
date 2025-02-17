from django.urls import path
from .views import LibroListCreateView, PrestamoListCreateView, ResenaListCreateView

urlpatterns = [
    #path('', bienvenida),
    path('libros/', LibroListCreateView.as_view(), name='libro_list_create'),
    path('prestamos/', PrestamoListCreateView.as_view(), name='prestamo_list_create'),
    path('resena/', ResenaListCreateView.as_view(), name='review_list_create'),
]