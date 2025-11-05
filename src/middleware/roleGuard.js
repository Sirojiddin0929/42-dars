export const ownershipOrRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userId = req.user?.id;
      const paramId = req.params?.id || req.params?.customerId || req.params?.userId;

      
      if (allowedRoles.includes(req.user?.role)) {
        
        if (req.user.role === "Admin") return next();
      }

      
      const method = req.method.toUpperCase();
      if (!paramId) {
        
        if (method === "GET") return next();
        return res.status(400).json({ message: "ID parametrlari topilmadi" });
      }

      
      if (paramId.toString() === userId.toString()) {
        return next();
      }

      
      return res.status(403).json({
        message: "Access denied: Siz faqat o'zingizning ma'lumotlaringizni o'zgartirishingiz mumkin",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Egalikni tekshirishda xatolik",
        error: error.message,
      });
    }
  };
};
