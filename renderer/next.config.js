module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }

    return config;
  },
  images: {
    domains: ["api.dicebear.com", "avatars.dicebear.com"],
  },
};
