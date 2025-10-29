export const ownershipOrRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userId = req.user?.id;
      const paramId = req.params.id;

      
      if (allowedRoles.includes(req.user.role)) {
        return next();
      }

     
      if (paramId && userId && paramId === userId) {
        return next();
      }

      return res.status(403).json({
        message: "Access denied: Siz faqat o'zingizning ma'lumotlaringizga kirishingiz mumkin"
      });
    } catch (error) {
      return res.status(500).json({
        message: "Egalikni tekshirishda xatolik",
        error: error.message
      });
    }
  };
};
