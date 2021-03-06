export class RouteConstants {
  static readonly admin = 'admin';
  static readonly category = 'categoria';
  static readonly post = 'post';
  static readonly user = 'usuario';
  static readonly profile = 'perfil';
  static readonly link = 'enlace';
  static readonly contact = 'contacto';
  static readonly new = 'nuevo';
  static readonly register = 'registrar';
  static readonly login = 'login';
  static readonly settings = 'configuracion';
  static readonly events = 'eventos';
  static readonly gallery = 'galeria';

  static readonly adminPages = {
    category: `/${RouteConstants.admin}/${RouteConstants.category}`,
    posts: `/${RouteConstants.admin}/${RouteConstants.post}`,
    profile: `/${RouteConstants.admin}/${RouteConstants.profile}`,
    user: `/${RouteConstants.admin}/${RouteConstants.user}`,
    settings: `/${RouteConstants.admin}/${RouteConstants.settings}`,
    links: `/${RouteConstants.admin}/${RouteConstants.link}`,
    galleries: `/${RouteConstants.admin}/${RouteConstants.gallery}`,
  };
}

