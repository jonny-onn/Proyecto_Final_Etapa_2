import { useState } from 'react';
import { ValidationErrors } from '../types';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (name: string, value: string | boolean, rules?: any): string => {
    let error = '';

    switch (name) {
      case 'nombre':
        if (!value || (typeof value === 'string' && value.trim().length < 3)) {
          error = 'El nombre debe tener al menos 3 caracteres';
        } else if (typeof value === 'string' && value.trim().length > 50) {
          error = 'El nombre no puede tener más de 50 caracteres';
        } else if (typeof value === 'string' && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
          error = 'El nombre solo puede contener letras y espacios';
        }
        break;

      case 'precio':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          error = 'El precio es obligatorio';
        } else if (typeof value === 'string' && (isNaN(Number(value)) || Number(value) <= 0)) {
          error = 'El precio debe ser un número mayor a 0';
        } else if (typeof value === 'string' && Number(value) > 999999) {
          error = 'El precio no puede ser mayor a $999,999';
        }
        break;

      case 'stock':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          error = 'El stock es obligatorio';
        } else if (typeof value === 'string' && (isNaN(Number(value)) || Number(value) < 0)) {
          error = 'El stock debe ser un número mayor o igual a 0';
        } else if (typeof value === 'string' && Number(value) > 9999) {
          error = 'El stock no puede ser mayor a 9999';
        }
        break;

      case 'marca':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          error = 'La marca debe tener al menos 2 caracteres';
        } else if (typeof value === 'string' && value.trim().length > 30) {
          error = 'La marca no puede tener más de 30 caracteres';
        }
        break;

      case 'categoria':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          error = 'La categoría debe tener al menos 2 caracteres';
        } else if (typeof value === 'string' && value.trim().length > 30) {
          error = 'La categoría no puede tener más de 30 caracteres';
        }
        break;

      case 'descripcionCorta':
        if (!value || (typeof value === 'string' && value.trim().length < 10)) {
          error = 'La descripción corta debe tener al menos 10 caracteres';
        } else if (typeof value === 'string' && value.trim().length > 100) {
          error = 'La descripción corta no puede tener más de 100 caracteres';
        }
        break;

      case 'descripcionLarga':
        if (!value || (typeof value === 'string' && value.trim().length < 20)) {
          error = 'La descripción larga debe tener al menos 20 caracteres';
        } else if (typeof value === 'string' && value.trim().length > 500) {
          error = 'La descripción larga no puede tener más de 500 caracteres';
        }
        break;

      case 'edadDesde':
      case 'edadHasta':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          error = 'La edad es obligatoria';
        } else if (typeof value === 'string' && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 99)) {
          error = 'La edad debe ser un número entre 0 y 99';
        }
        break;

      case 'foto':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          error = 'La URL de la foto es obligatoria';
        } else if (typeof value === 'string' && !isValidUrl(value.trim())) {
          error = 'Debe ser una URL válida';
        }
        break;

      case 'email':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          error = 'El email es obligatorio';
        } else if (typeof value === 'string' && !isValidEmail(value.trim())) {
          error = 'Debe ser un email válido';
        }
        break;

      case 'comentarios':
        if (!value || (typeof value === 'string' && value.trim().length < 10)) {
          error = 'Los comentarios deben tener al menos 10 caracteres';
        } else if (typeof value === 'string' && value.trim().length > 500) {
          error = 'Los comentarios no pueden tener más de 500 caracteres';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateForm = (formData: any): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Validación especial para edades
    if (formData.edadDesde && formData.edadHasta) {
      const edadDesde = Number(formData.edadDesde);
      const edadHasta = Number(formData.edadHasta);
      if (edadDesde > edadHasta) {
        newErrors.edadHasta = 'La edad hasta debe ser mayor o igual a la edad desde';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const setFieldError = (field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const clearFieldError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateField,
    validateForm,
    setFieldError,
    clearFieldError,
    clearAllErrors,
  };
};

// Funciones auxiliares
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
