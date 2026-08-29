'use client';

import React, { useState } from 'react';
import { 
  UserPlus, UserMinus, FileEdit, FilePlus, Image as ImageIcon, 
  Trash2, Upload
} from 'lucide-react';
import { Modal, Input, Button, Badge } from '@/components/design-system';

export type AdminModalType = 
  | 'createUser' 
  | 'deleteUser' 
  | 'editPage' 
  | 'addDocument' 
  | 'managePhotos' 
  | null;

export interface AdminModalsProps {
  activeModal: AdminModalType;
  onClose: () => void;
  onSuccessNotification?: (message: string) => void;
}

export const AdminModals: React.FC<AdminModalsProps> = ({
  activeModal,
  onClose,
  onSuccessNotification,
}) => {
  // Create User state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Archivista');

  // Delete User state (mock user list)
  const [userList, setUserList] = useState([
    { id: '1', name: 'Carlos Guanga', email: 'carlos@casamemoria.gov.co', role: 'Administrador' },
    { id: '2', name: 'María Tarapues', email: 'maria@casamemoria.gov.co', role: 'Archivista' },
    { id: '3', name: 'Lucía Alpala', email: 'lucia@casamemoria.gov.co', role: 'Historiadora' },
  ]);

  // Edit Page state
  const [heroTitle, setHeroTitle] = useState('Casa de la Memoria Cumbal');
  const [heroDesc, setHeroDesc] = useState('Centro cultural. Desarrollamos estrategias de salvaguarda y protección del patrimonio.');
  const [convocatoriaTitle, setConvocatoriaTitle] = useState('Convocatoria Abierta 2026');

  // Add Document state
  const [docTitle, setDocTitle] = useState('');
  const [docCode, setDocCode] = useState('');
  const [docYear, setDocYear] = useState('2025');
  const [docCategory, setDocCategory] = useState('Documental');

  // Photo upload state
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoYear, setPhotoYear] = useState('2026');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    setUserList([
      ...userList,
      {
        id: Date.now().toString(),
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
      },
    ]);

    if (onSuccessNotification) {
      onSuccessNotification(`Usuario "${newUserName}" creado exitosamente.`);
    }

    setNewUserName('');
    setNewUserEmail('');
    onClose();
  };

  const handleDeleteUser = (id: string, name: string) => {
    setUserList(userList.filter((u) => u.id !== id));
    if (onSuccessNotification) {
      onSuccessNotification(`Usuario "${name}" eliminado correctamente.`);
    }
  };

  const handleSavePageContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccessNotification) {
      onSuccessNotification('Secciones principales de la página actualizadas correctamente.');
    }
    onClose();
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;
    if (onSuccessNotification) {
      onSuccessNotification(`Documento "${docTitle}" registrado en el archivo histórico (${docYear}).`);
    }
    setDocTitle('');
    setDocCode('');
    onClose();
  };

  const handleUploadPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle) return;
    if (onSuccessNotification) {
      onSuccessNotification(`Fotografía "${photoTitle}" añadida a la fototeca (${photoYear}).`);
    }
    setPhotoTitle('');
    onClose();
  };

  return (
    <>
      {/* 1. MODAL CREAR USUARIO */}
      <Modal
        isOpen={activeModal === 'createUser'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-mostaza" />
            <span>Crear Nuevo Usuario</span>
          </div>
        }
        subtitle="Registrar nuevo personal de archivo o gestión"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <Input
            label="Nombre Completo"
            placeholder="Ej. Ana Lucía Cumbal"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />

          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="ejemplo@casamemoria.gov.co"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-cafe/90 mb-1.5">Rol de Permisos</label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
              className="w-full rounded-xl bg-white text-cafe border border-crema-dark p-2.5 text-sm font-medium focus:ring-2 focus:ring-verde-profundo/20 focus:border-verde-profundo"
            >
              <option value="Administrador">Administrador General</option>
              <option value="Archivista">Archivista General</option>
              <option value="Historiador">Historiador / Investigador</option>
            </select>
          </div>

          <div className="pt-3 flex justify-end space-x-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="terracota">Guardar Usuario</Button>
          </div>
        </form>
      </Modal>

      {/* 2. MODAL ELIMINAR USUARIOS */}
      <Modal
        isOpen={activeModal === 'deleteUser'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2">
            <UserMinus className="w-5 h-5 text-mostaza" />
            <span>Administrar y Eliminar Usuarios</span>
          </div>
        }
        subtitle="Gestión de accesos existentes en el sistema"
        size="lg"
      >
        <div className="space-y-3">
          <p className="text-xs text-cafe/70">
            Haga clic en el botón de eliminar junto al usuario que desea remover del sistema.
          </p>

          <div className="border border-crema-dark rounded-xl overflow-hidden divide-y divide-crema-dark bg-white">
            {userList.map((u) => (
              <div key={u.id} className="p-3 sm:p-4 flex items-center justify-between hover:bg-crema/40 transition-colors">
                <div>
                  <p className="font-bold text-sm text-verde-profundo">{u.name}</p>
                  <p className="text-xs text-cafe/60">{u.email}</p>
                  <Badge variant={u.role === 'Administrador' ? 'terracota' : 'verde'} className="mt-1">
                    {u.role}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDeleteUser(u.id, u.name)}
                  leftIcon={<Trash2 className="w-4 h-4" />}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>

          <div className="pt-3 flex justify-end">
            <Button variant="ghost" onClick={onClose}>Cerrar</Button>
          </div>
        </div>
      </Modal>

      {/* 3. MODAL EDITAR PÁGINA */}
      <Modal
        isOpen={activeModal === 'editPage'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2">
            <FileEdit className="w-5 h-5 text-mostaza" />
            <span>Editar Textos de la Página Web</span>
          </div>
        }
        subtitle="Modifica la información visible en el sitio público"
        size="lg"
      >
        <form onSubmit={handleSavePageContent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-cafe/90 mb-1">Título Sección Principal (Hero)</label>
            <Input
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-cafe/90 mb-1">Descripción del Proceso Cultural</label>
            <textarea
              rows={3}
              value={heroDesc}
              onChange={(e) => setHeroDesc(e.target.value)}
              className="w-full rounded-xl bg-white text-cafe border border-crema-dark p-3 text-sm font-medium focus:ring-2 focus:ring-verde-profundo/20 focus:border-verde-profundo"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-cafe/90 mb-1">Título Convocatorias Activas</label>
            <Input
              value={convocatoriaTitle}
              onChange={(e) => setConvocatoriaTitle(e.target.value)}
              required
            />
          </div>

          <div className="pt-3 flex justify-end space-x-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="terracota">Guardar Cambios</Button>
          </div>
        </form>
      </Modal>

      {/* 4. MODAL AÑADIR DOCUMENTOS */}
      <Modal
        isOpen={activeModal === 'addDocument'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2">
            <FilePlus className="w-5 h-5 text-mostaza" />
            <span>Añadir Nuevo Documento al Archivo</span>
          </div>
        }
        subtitle="Catalogación documental para la Memoria General"
        size="lg"
      >
        <form onSubmit={handleAddDocument} className="space-y-4">
          <Input
            label="Título del Documento o Acta"
            placeholder="Ej. Acta de Delimitación Territorial de Cumbal"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Código de Referencia / Registro"
              placeholder="Ej. AGN-CUM-2025-08"
              value={docCode}
              onChange={(e) => setDocCode(e.target.value)}
            />

            <div>
              <label className="block text-xs font-semibold text-cafe/90 mb-1.5">Categoría</label>
              <select
                value={docCategory}
                onChange={(e) => setDocCategory(e.target.value)}
                className="w-full rounded-xl bg-white text-cafe border border-crema-dark p-2.5 text-sm font-medium focus:ring-2 focus:ring-verde-profundo/20 focus:border-verde-profundo"
              >
                <option value="Documental">Documental / Acta</option>
                <option value="Histórico">Fondo Histórico</option>
                <option value="Fotografía">Fototeca</option>
                <option value="Audio">Testimonio Oral / Audio</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cafe/90 mb-1.5">Año del Documento</label>
              <select
                value={docYear}
                onChange={(e) => setDocYear(e.target.value)}
                className="w-full rounded-xl bg-white text-cafe border border-crema-dark p-2.5 text-sm font-medium focus:ring-2 focus:ring-verde-profundo/20 focus:border-verde-profundo"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2020">2020 (Histórico)</option>
                <option value="1990">1990 (Fondo Antiguo)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-cafe/90 mb-1.5">Adjuntar Archivo PDF / Escáner</label>
            <div className="border-2 border-dashed border-crema-dark rounded-xl p-6 text-center bg-white/50 hover:bg-white transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-terracota mx-auto mb-2" />
              <p className="text-xs font-bold text-verde-profundo">Haz clic para examinar o arrastra un archivo PDF</p>
              <p className="text-[11px] text-cafe/50 mt-1">Formatos permitidos: PDF, TIFF, DOCX (Máx. 50MB)</p>
            </div>
          </div>

          <div className="pt-3 flex justify-end space-x-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="terracota">Registrar Documento</Button>
          </div>
        </form>
      </Modal>

      {/* 5. MODAL ADMINISTRAR ARCHIVOS Y FOTOGRAFÍAS */}
      <Modal
        isOpen={activeModal === 'managePhotos'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2">
            <ImageIcon className="w-5 h-5 text-mostaza" />
            <span>Administrar Archivos & Fototeca</span>
          </div>
        }
        subtitle="Cargar y organizar el archivo fotográfico histórico"
        size="lg"
      >
        <form onSubmit={handleUploadPhoto} className="space-y-4">
          <Input
            label="Título de la Fotografía o Colección"
            placeholder="Ej. Encuentro de Sabedores Ancestrales"
            value={photoTitle}
            onChange={(e) => setPhotoTitle(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-cafe/90 mb-1.5">Año de la Fotografía</label>
            <select
              value={photoYear}
              onChange={(e) => setPhotoYear(e.target.value)}
              className="w-full rounded-xl bg-white text-cafe border border-crema-dark p-2.5 text-sm font-medium focus:ring-2 focus:ring-verde-profundo/20 focus:border-verde-profundo"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2020">2020</option>
              <option value="1995">1995 (Fototeca Histórica)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-cafe/90 mb-1.5">Subir Imagen HD</label>
            <div className="border-2 border-dashed border-crema-dark rounded-xl p-6 text-center bg-white/50 hover:bg-white transition-colors cursor-pointer">
              <ImageIcon className="w-8 h-8 text-verde-profundo mx-auto mb-2" />
              <p className="text-xs font-bold text-verde-profundo">Seleccionar imagen desde tu equipo</p>
              <p className="text-[11px] text-cafe/50 mt-1">Formatos permitidos: JPG, PNG, WEBP (Hasta 20MB)</p>
            </div>
          </div>

          <div className="pt-3 flex justify-end space-x-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="terracota">Subir a Fototeca</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
