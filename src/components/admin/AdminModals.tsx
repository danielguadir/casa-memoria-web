'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserPlus, UserMinus, FilePlus, Image as ImageIcon, 
  Trash2, Upload, Users, Activity, Clock, Wrench, Type, Palette, FileText, Check, RotateCcw, Sliders
} from 'lucide-react';
import { Modal, Input, Button, Badge } from '@/components/design-system';
import { useSiteSettings, FONT_PRESETS, THEME_PRESETS, ThemeColors } from '@/context/SiteSettingsContext';

export type AdminModalType = 
  | 'createUser' 
  | 'deleteUser' 
  | 'editPage'
  | 'editPageContent'
  | 'editFont'
  | 'editTheme' 
  | 'addDocument' 
  | 'managePhotos' 
  | 'showUsers'
  | 'webInteraction'
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
  const { 
    siteContent, updatePageContent, 
    selectedFontId, setFont, 
    selectedThemeId, setTheme, 
    activeColors, updateCustomColor, 
    resetToDefaults 
  } = useSiteSettings();

  // Create User state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Archivista');

  // Directory User list state
  const [userList, setUserList] = useState([
    { id: '1', name: 'Carlos Guanga', email: 'carlos@casamemoria.gov.co', role: 'Administrador', lastLogin: 'Hoy, 20:25', status: 'Activo' },
    { id: '2', name: 'María Tarapues', email: 'maria@casamemoria.gov.co', role: 'Archivista', lastLogin: 'Hoy, 18:10', status: 'Activo' },
    { id: '3', name: 'Lucía Alpala', email: 'lucia@casamemoria.gov.co', role: 'Historiadora', lastLogin: 'Ayer, 15:40', status: 'Inactivo' },
  ]);

  // Page Content Edit local state
  const [contentTab, setContentTab] = useState<'inicio' | 'convocatoria' | 'sobreProceso'>('inicio');
  const [themeTab, setThemeTab] = useState<'presets' | 'custom'>('presets');
  
  const [heroTitle, setHeroTitle] = useState(siteContent.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(siteContent.heroSubtitle);
  const [heroDesc, setHeroDesc] = useState(siteContent.heroDesc);
  const [convocatoriaTitle, setConvocatoriaTitle] = useState(siteContent.convocatoriaTitle);
  const [convocatoriaDesc, setConvocatoriaDesc] = useState(siteContent.convocatoriaDesc);
  const [sobreProcesoTitle, setSobreProcesoTitle] = useState(siteContent.sobreProcesoTitle);
  const [sobreProcesoDesc, setSobreProcesoDesc] = useState(siteContent.sobreProcesoDesc);

  // Synchronize local form state with context siteContent whenever modal opens
  useEffect(() => {
    setHeroTitle(siteContent.heroTitle);
    setHeroSubtitle(siteContent.heroSubtitle);
    setHeroDesc(siteContent.heroDesc);
    setConvocatoriaTitle(siteContent.convocatoriaTitle);
    setConvocatoriaDesc(siteContent.convocatoriaDesc);
    setSobreProcesoTitle(siteContent.sobreProcesoTitle);
    setSobreProcesoDesc(siteContent.sobreProcesoDesc);
  }, [siteContent, activeModal]);

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
        lastLogin: 'Nunca',
        status: 'Activo',
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
    updatePageContent({
      heroTitle,
      heroSubtitle,
      heroDesc,
      convocatoriaTitle,
      convocatoriaDesc,
      sobreProcesoTitle,
      sobreProcesoDesc,
    });
    if (onSuccessNotification) {
      onSuccessNotification('Secciones del sitio web actualizadas y reflejadas en tiempo real.');
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

  const isEditContentOpen = activeModal === 'editPageContent' || activeModal === 'editPage';

  const colorFields: { key: keyof ThemeColors; label: string; desc: string }[] = [
    { key: 'crema', label: 'Fondo Principal (Crema)', desc: 'Color de fondo general de las secciones principales.' },
    { key: 'cremaDark', label: 'Fondo Secundario (Crema Oscuro)', desc: 'Color de tarjetas, paneles y fondo de sección secundaria.' },
    { key: 'verdeProfundo', label: 'Color Primario (Verde Profundo)', desc: 'Encabezados principales, marca y barra superior.' },
    { key: 'terracota', label: 'Color Secundario (Terracota)', desc: 'Botones principales, acentos de marca y badges.' },
    { key: 'terracotaLight', label: 'Terracota Claro', desc: 'Variante de acento brillante para estados hover y tarjetas.' },
    { key: 'cafe', label: 'Color de Texto (Café)', desc: 'Tono principal de los párrafos y contenidos de lectura.' },
    { key: 'mostaza', label: 'Color Acento (Mostaza)', desc: 'Detalles dorados, bordes y botones destacados.' },
  ];

  return (
    <>
      {/* 1. MODAL CREAR USUARIO */}
      <Modal
        isOpen={activeModal === 'createUser'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2 font-serif font-bold text-lg">
            <UserPlus className="w-5 h-5 text-mostaza" />
            <span>Crear Nuevo Usuario</span>
          </div>
        }
        subtitle="Registrar nuevo personal de archivo o gestión"
      >
        <form onSubmit={handleCreateUser} className="space-y-4 font-sans">
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

      {/* 2. MODAL MOSTRAR USUARIOS (Directorio de Usuarios) */}
      <Modal
        isOpen={activeModal === 'showUsers'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2 font-serif font-bold text-lg">
            <Users className="w-5 h-5 text-verde-profundo" />
            <span>Directorio de Usuarios Registrados</span>
          </div>
        }
        subtitle="Listado completo del personal con acceso al sistema"
        size="lg"
      >
        <div className="space-y-4 font-sans">
          <div className="border border-crema-dark rounded-xl overflow-hidden divide-y divide-crema-dark bg-white">
            {userList.map((u) => (
              <div key={u.id} className="p-4 flex items-center justify-between hover:bg-crema/40 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-verde-profundo/10 text-verde-profundo font-bold flex items-center justify-center text-sm">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-verde-profundo">{u.name}</p>
                    <p className="text-xs text-cafe/60">{u.email}</p>
                  </div>
                </div>

                <div className="text-right">
                  <Badge variant={u.role === 'Administrador' ? 'terracota' : 'verde'}>
                    {u.role}
                  </Badge>
                  <p className="text-[11px] text-cafe/50 mt-1 flex items-center justify-end space-x-1">
                    <Clock size={12} className="text-mostaza" />
                    <span>Último acceso: {u.lastLogin}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 flex justify-end space-x-3">
            <Button variant="ghost" onClick={onClose}>Cerrar</Button>
            <Button variant="terracota" onClick={() => { onClose(); }}>Aceptar</Button>
          </div>
        </div>
      </Modal>

      {/* 3. MODAL ELIMINAR USUARIOS */}
      <Modal
        isOpen={activeModal === 'deleteUser'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2 font-serif font-bold text-lg">
            <UserMinus className="w-5 h-5 text-mostaza" />
            <span>Administrar y Eliminar Usuarios</span>
          </div>
        }
        subtitle="Gestión de accesos existentes en el sistema"
        size="lg"
      >
        <div className="space-y-3 font-sans">
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

      {/* 4. MODAL INTERACCIÓN WEB & INICIOS DE SESIÓN */}
      <Modal
        isOpen={activeModal === 'webInteraction'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2 font-serif font-bold text-lg">
            <Activity className="w-5 h-5 text-terracota" />
            <span>Interacción Web & Registro de Sesiones</span>
          </div>
        }
        subtitle="Monitoreo de tráfico, accesos y horario de inicio de sesión de usuarios"
        size="lg"
      >
        <div className="space-y-4 font-sans">
          <div className="p-4 rounded-xl bg-mostaza/15 border-2 border-mostaza/40 flex items-start space-x-3 text-cafe">
            <Wrench className="w-6 h-6 text-terracota shrink-0 mt-0.5 animate-bounce" />
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-bold text-sm text-verde-profundo">Módulo Actualmente en Desarrollo</h4>
                <Badge variant="mostaza">En Proceso</Badge>
              </div>
              <p className="text-xs text-cafe/80 mt-1 leading-relaxed">
                Esta opción para visualizar la <strong>interacción en tiempo real de la página web</strong> y el <strong>registro detallado de quién inició sesión y a qué hora</strong> se encuentra en construcción por el momento.
              </p>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold text-verde-profundo uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Clock size={14} className="text-terracota" />
              <span>Vista Previa: Registro Reciente de Accesos</span>
            </h5>

            <div className="border border-crema-dark rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left text-xs text-cafe">
                <thead className="bg-crema-dark/50 text-cafe font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Usuario</th>
                    <th className="py-2.5 px-3">Rol</th>
                    <th className="py-2.5 px-3">Fecha y Hora</th>
                    <th className="py-2.5 px-3 text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-crema-dark/40">
                  <tr className="hover:bg-crema/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-verde-profundo">Carlos Guanga</td>
                    <td className="py-2.5 px-3 text-cafe/70">Administrador</td>
                    <td className="py-2.5 px-3 font-mono text-[11px]">Hoy, 20:25:14</td>
                    <td className="py-2.5 px-3 text-right">
                      <Badge variant="verde">En Línea</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <Button variant="terracota" onClick={onClose}>Entendido</Button>
          </div>
        </div>
      </Modal>

      {/* 5. MODAL EDITAR CONTENIDO DE SECCIONES (INICIO, CONVOCATORIAS, QUIÉNES SOMOS) */}
      <Modal
        isOpen={isEditContentOpen}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2 font-serif font-bold text-lg">
            <FileText className="w-5 h-5 text-terracota" />
            <span>Editar Contenido de Secciones</span>
          </div>
        }
        subtitle="Los cambios guardados se reflejarán inmediatamente en la página principal"
        size="lg"
      >
        <form onSubmit={handleSavePageContent} className="space-y-5 font-sans">
          
          {/* Sub-tabs for content sections */}
          <div className="flex border-b border-crema-dark space-x-2">
            <button
              type="button"
              onClick={() => setContentTab('inicio')}
              className={`py-2 px-4 text-xs font-bold rounded-t-xl transition-colors border-b-2 ${
                contentTab === 'inicio'
                  ? 'border-terracota text-terracota bg-crema-dark/30'
                  : 'border-transparent text-cafe/70 hover:text-verde-profundo'
              }`}
            >
              Página de Inicio (Hero)
            </button>
            <button
              type="button"
              onClick={() => setContentTab('convocatoria')}
              className={`py-2 px-4 text-xs font-bold rounded-t-xl transition-colors border-b-2 ${
                contentTab === 'convocatoria'
                  ? 'border-terracota text-terracota bg-crema-dark/30'
                  : 'border-transparent text-cafe/70 hover:text-verde-profundo'
              }`}
            >
              Convocatorias
            </button>
            <button
              type="button"
              onClick={() => setContentTab('sobreProceso')}
              className={`py-2 px-4 text-xs font-bold rounded-t-xl transition-colors border-b-2 ${
                contentTab === 'sobreProceso'
                  ? 'border-terracota text-terracota bg-crema-dark/30'
                  : 'border-transparent text-cafe/70 hover:text-verde-profundo'
              }`}
            >
              Quiénes somos
            </button>
          </div>

          {/* Tab 1: INICIO */}
          {contentTab === 'inicio' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-cafe/90 mb-1">Título Principal (Hero)</label>
                <Input
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="Ej. Casa de la Memoria Cumbal"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cafe/90 mb-1">Subtítulo Destacado</label>
                <Input
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="Ej. Centro cultural y Archivo General"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cafe/90 mb-1">Descripción del Proceso Cultural</label>
                <textarea
                  rows={4}
                  value={heroDesc}
                  onChange={(e) => setHeroDesc(e.target.value)}
                  className="w-full rounded-xl bg-white text-cafe border border-crema-dark p-3 text-sm font-medium focus:ring-2 focus:ring-verde-profundo/20 focus:border-verde-profundo leading-relaxed"
                  placeholder="Escribe la descripción pública..."
                  required
                />
              </div>
            </div>
          )}

          {/* Tab 2: CONVOCATORIA */}
          {contentTab === 'convocatoria' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-cafe/90 mb-1">Título de la Convocatoria</label>
                <Input
                  value={convocatoriaTitle}
                  onChange={(e) => setConvocatoriaTitle(e.target.value)}
                  placeholder="Ej. Convocatoria Abierta 2026"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cafe/90 mb-1">Descripción o Instrucciones</label>
                <textarea
                  rows={4}
                  value={convocatoriaDesc}
                  onChange={(e) => setConvocatoriaDesc(e.target.value)}
                  className="w-full rounded-xl bg-white text-cafe border border-crema-dark p-3 text-sm font-medium focus:ring-2 focus:ring-verde-profundo/20 focus:border-verde-profundo leading-relaxed"
                  placeholder="Descripción de la convocatoria..."
                  required
                />
              </div>
            </div>
          )}

          {/* Tab 3: QUIÉNES SOMOS */}
          {contentTab === 'sobreProceso' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-cafe/90 mb-1">Título de la Sección</label>
                <Input
                  value={sobreProcesoTitle}
                  onChange={(e) => setSobreProcesoTitle(e.target.value)}
                  placeholder="Ej. Quiénes somos"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cafe/90 mb-1">Resumen del Proceso</label>
                <textarea
                  rows={4}
                  value={sobreProcesoDesc}
                  onChange={(e) => setSobreProcesoDesc(e.target.value)}
                  className="w-full rounded-xl bg-white text-cafe border border-crema-dark p-3 text-sm font-medium focus:ring-2 focus:ring-verde-profundo/20 focus:border-verde-profundo leading-relaxed"
                  placeholder="Detalles sobre la misión del proceso..."
                  required
                />
              </div>
            </div>
          )}

          <div className="pt-3 flex items-center justify-between border-t border-crema-dark">
            <button
              type="button"
              onClick={resetToDefaults}
              className="text-xs text-cafe/60 hover:text-terracota font-medium flex items-center space-x-1"
            >
              <RotateCcw size={14} />
              <span>Restablecer Todo</span>
            </button>

            <div className="flex space-x-3">
              <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
              <Button type="submit" variant="terracota">Guardar y Publicar</Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* 6. MODAL EDITAR FUENTE / TIPOGRAFÍA */}
      <Modal
        isOpen={activeModal === 'editFont'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2 font-serif font-bold text-lg">
            <Type className="w-5 h-5 text-terracota" />
            <span>Personalizar Fuente / Tipografía</span>
          </div>
        }
        subtitle="Selecciona la combinación tipográfica para los títulos y textos del sitio"
        size="lg"
      >
        <div className="space-y-5 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FONT_PRESETS.map((font) => {
              const isSelected = font.id === selectedFontId;
              return (
                <div
                  key={font.id}
                  onClick={() => setFont(font.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-terracota bg-terracota/5 shadow-md'
                      : 'border-crema-dark bg-white hover:border-mostaza/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-verde-profundo">{font.name}</h4>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-terracota text-crema flex items-center justify-center">
                        <Check size={12} />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-cafe/70 mb-3">{font.description}</p>
                  <div className="p-3 bg-crema rounded-lg border border-crema-dark/60 text-xs">
                    <p className="font-serif text-sm font-bold text-verde-profundo">Casa de la Memoria</p>
                    <p className="font-sans text-cafe/80 mt-1 text-[11px]">
                      Salvaguarda y protección del patrimonio indígena.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 flex justify-end space-x-3 border-t border-crema-dark">
            <Button variant="terracota" onClick={() => {
              if (onSuccessNotification) {
                onSuccessNotification('Combinación tipográfica actualizada y aplicada al sitio web.');
              }
              onClose();
            }}>
              Aplicar Tipografía
            </Button>
          </div>
        </div>
      </Modal>

      {/* 7. MODAL EDITAR TEMA / COLORES Y PALETA PERSONALIZADA */}
      <Modal
        isOpen={activeModal === 'editTheme'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2 font-serif font-bold text-lg">
            <Palette className="w-5 h-5 text-mostaza" />
            <span>Personalizar Tema de Color</span>
          </div>
        }
        subtitle="Los cambios de color se aplican en tiempo real en toda la página web"
        size="lg"
      >
        <div className="space-y-5 font-sans">
          
          {/* Sub-tabs for presets vs custom color pickers */}
          <div className="flex border-b border-crema-dark space-x-2">
            <button
              type="button"
              onClick={() => setThemeTab('presets')}
              className={`py-2 px-4 text-xs font-bold rounded-t-xl transition-colors border-b-2 ${
                themeTab === 'presets'
                  ? 'border-verde-profundo text-verde-profundo bg-crema-dark/30'
                  : 'border-transparent text-cafe/70 hover:text-verde-profundo'
              }`}
            >
              Paletas Predeterminadas
            </button>
            <button
              type="button"
              onClick={() => setThemeTab('custom')}
              className={`py-2 px-4 text-xs font-bold rounded-t-xl transition-colors border-b-2 flex items-center space-x-1.5 ${
                themeTab === 'custom'
                  ? 'border-terracota text-terracota bg-crema-dark/30'
                  : 'border-transparent text-cafe/70 hover:text-verde-profundo'
              }`}
            >
              <Sliders size={14} />
              <span>Personalizar Paleta de Colores</span>
            </button>
          </div>

          {/* TAB 1: PRESETS */}
          {themeTab === 'presets' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              {THEME_PRESETS.map((theme) => {
                const isSelected = theme.id === selectedThemeId;
                return (
                  <div
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme.id);
                      if (onSuccessNotification) {
                        onSuccessNotification(`Tema "${theme.name}" aplicado en tiempo real.`);
                      }
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-verde-profundo bg-verde-profundo/5 shadow-md ring-2 ring-verde-profundo/20'
                        : 'border-crema-dark bg-white hover:border-mostaza/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-sm text-verde-profundo">{theme.name}</h4>
                        {theme.isDark && (
                          <Badge variant="terracota" className="text-[10px]">Oscuro</Badge>
                        )}
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-verde-profundo text-crema flex items-center justify-center shadow-xs">
                          <Check size={12} />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-cafe/70 mb-3 leading-relaxed">{theme.description}</p>
                    
                    {/* Color Swatches */}
                    <div className="flex items-center space-x-2 pt-2 border-t border-crema-dark/50">
                      <span
                        className="w-6 h-6 rounded-full border border-black/20 shadow-xs"
                        style={{ backgroundColor: theme.crema }}
                        title="Crema Principal"
                      />
                      <span
                        className="w-6 h-6 rounded-full border border-black/20 shadow-xs"
                        style={{ backgroundColor: theme.verdeProfundo }}
                        title="Verde Profundo"
                      />
                      <span
                        className="w-6 h-6 rounded-full border border-black/20 shadow-xs"
                        style={{ backgroundColor: theme.terracota }}
                        title="Terracota"
                      />
                      <span
                        className="w-6 h-6 rounded-full border border-black/20 shadow-xs"
                        style={{ backgroundColor: theme.mostaza }}
                        title="Mostaza Acento"
                      />
                      <span
                        className="w-6 h-6 rounded-full border border-black/20 shadow-xs"
                        style={{ backgroundColor: theme.cafe }}
                        title="Café Texto"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: CUSTOM COLOR PICKER */}
          {themeTab === 'custom' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs text-cafe/70 bg-crema-dark/40 p-3 rounded-xl border border-crema-dark">
                Elige y ajusta cada color individualmente con el selector de color o ingresando el código hexadecimal. Todos los componentes de la página se actualizarán instantáneamente.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                {colorFields.map((field) => {
                  const currentColor = activeColors[field.key];
                  return (
                    <div key={field.key} className="p-3 bg-white rounded-xl border border-crema-dark flex items-center justify-between shadow-xs">
                      <div>
                        <p className="text-xs font-bold text-verde-profundo">{field.label}</p>
                        <p className="text-[10px] text-cafe/60">{field.desc}</p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 ml-2">
                        <input
                          type="color"
                          value={currentColor}
                          onChange={(e) => updateCustomColor(field.key, e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-crema-dark p-0.5 bg-transparent"
                          title={`Seleccionar color para ${field.label}`}
                        />
                        <input
                          type="text"
                          value={currentColor}
                          onChange={(e) => updateCustomColor(field.key, e.target.value)}
                          className="w-20 px-2 py-1 text-xs font-mono rounded-lg border border-crema-dark bg-crema text-cafe focus:ring-1 focus:ring-verde-profundo"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-3 flex items-center justify-between border-t border-crema-dark">
            <button
              type="button"
              onClick={resetToDefaults}
              className="text-xs text-cafe/60 hover:text-terracota font-medium flex items-center space-x-1"
            >
              <RotateCcw size={14} />
              <span>Restablecer Tema Original</span>
            </button>

            <div className="flex space-x-3">
              <Button variant="ghost" onClick={onClose}>Cerrar</Button>
              <Button variant="terracota" onClick={() => {
                if (onSuccessNotification) {
                  onSuccessNotification('Tema cromático aplicado en vivo a toda la página web.');
                }
                onClose();
              }}>
                Guardar y Aplicar
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* 8. MODAL AÑADIR DOCUMENTOS */}
      <Modal
        isOpen={activeModal === 'addDocument'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2 font-serif font-bold text-lg">
            <FilePlus className="w-5 h-5 text-mostaza" />
            <span>Añadir Nuevo Documento al Archivo</span>
          </div>
        }
        subtitle="Catalogación documental para la Memoria General"
        size="lg"
      >
        <form onSubmit={handleAddDocument} className="space-y-4 font-sans">
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

      {/* 9. MODAL ADMINISTRAR ARCHIVOS Y FOTOGRAFÍAS */}
      <Modal
        isOpen={activeModal === 'managePhotos'}
        onClose={onClose}
        title={
          <div className="flex items-center space-x-2 font-serif font-bold text-lg">
            <ImageIcon className="w-5 h-5 text-mostaza" />
            <span>Administrar Archivos & Fototeca</span>
          </div>
        }
        subtitle="Cargar y organizar el archivo fotográfico histórico"
        size="lg"
      >
        <form onSubmit={handleUploadPhoto} className="space-y-4 font-sans">
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
