const agentMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    if (
      req.user.role !== "agent" &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message:
          "Agent access required.",
      });
    }

    next();
  } catch (error) {
    console.error(
      "Agent middleware error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Agent authorization failed.",
    });
  }
};

export default agentMiddleware;