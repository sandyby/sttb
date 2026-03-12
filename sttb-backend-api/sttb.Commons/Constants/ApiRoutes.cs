namespace sttb.Commons.Constants;

public static class ApiRoutes
{
    public static class Auth
    {
        public const string Login = "api/auth/login";
        public const string Refresh = "api/auth/refresh";
        public const string Logout = "api/auth/logout";
    }

    public static class News
    {
        public const string List = "list";
        public const string Categories = "categories";
        public const string CategoriesCreate = "categories/create";
        public const string CategoriesDelete = "categories/delete/{id}";
        public const string Detail = "{slug}";
        public const string Create = "create";
        public const string Update = "update/{id}";
        public const string Delete = "delete/{id}";
    }

    public static class Events
    {
        public const string List = "list";
        public const string Categories = "categories";
        public const string CategoriesCreate = "categories/create";
        public const string CategoriesDelete = "categories/delete/{id}";
        public const string Create = "create";
        public const string Update = "update/{id}";
        public const string Delete = "delete/{id}";
    }

    public static class Media
    {
        public const string List = "list";
        public const string Categories = "categories";
        public const string CategoriesCreate = "categories/create";
        public const string CategoriesDelete = "categories/delete/{id}";
        public const string Create = "create";
        public const string Delete = "delete/{id}";
    }

    public static class Pages
    {
        public const string Get = "{slug}";
        public const string Update = "update/{slug}";
    }

    public static class Lecturers
    {
        public const string List = "list";
        public const string Create = "create";
        public const string Update = "update/{id}";
        public const string Delete = "delete/{id}";
    }

    public static class Upload
    {
        public const string Image = "image";
        public const string Video = "video";
    }
}
