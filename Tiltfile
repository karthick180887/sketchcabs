# -*- mode: Python -*-

# Tiltfile for SketchCabs

# Allow DigitalOcean production cluster
allow_k8s_contexts('do-blr1-k8s-1-34-1-do-1-blr1-1765796098736')

# Docker build configuration
docker_build(
    'karthick1808/sketchcabs-web',
    '.',
    dockerfile='Dockerfile',
    live_update=[
        # Sync source files for hot reload
        sync('.', '/app'),
        # Rebuild on package changes
        run('npm install', trigger=['package.json', 'package-lock.json']),
    ],
    ignore=[
        'node_modules',
        '.next',
        'k8s',
        '.git',
    ]
)

# Kubernetes resources
k8s_yaml([
    'k8s/namespace.yaml',
    'k8s/deployment.yaml',
    'k8s/service.yaml',
    'k8s/ingress.yaml',
])

# Resource configuration
k8s_resource(
    'sketchcabs-web',
    port_forwards='3000:3000',
    labels=['app']
)

# Local development mode (optional)
# Run 'tilt up -- --local' to use local development server instead
config.define_bool("local")
cfg = config.parse()

if cfg.get("local"):
    # Use local npm dev server instead of Docker
    local_resource(
        'npm-dev',
        serve_cmd='npm run dev',
        serve_dir='.',
        deps=['package.json'],
        labels=['local']
    )
