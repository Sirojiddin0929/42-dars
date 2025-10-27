export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role; 

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Sizda bu amalni bajarish huquqi yoq" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Rolni tekshirishda xatolik", error: error.message });
    }
  };
};
