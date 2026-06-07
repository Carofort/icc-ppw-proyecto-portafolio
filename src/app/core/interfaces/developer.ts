export interface Developer {
  id: number;
  documentId: string;
  nombre: string;
  especialidad: string;
  descripcionBreve: string;
  descripcionCompleta: string;
  correo: string;
  github: string;
  linkedin: string;
  activo: boolean;

  foto: {
    url: string;
  };
}