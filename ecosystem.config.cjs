module.exports = {
  apps: [
    {
      name: "ridefi",
      cwd: "/opt/ridefi",

      script: "npm",
      args: "start -- -p 3100",

      env: {
        NODE_ENV: "production",
        PORT: "3100"
      },

      autorestart: true,
      restart_delay: 3000,

      max_memory_restart: "700M",

      time: true
    }
  ]
};
