data "template_file" "init" {
  template = file("${path.module}/scripts/init.sh")
  vars = {
    app_port = var.app_port
    domain   = var.domain
  }
}


# droplet
resource "digitalocean_droplet" "droplet" {
  image     = "ubuntu-18-04-x64"
  name      = var.droplet_name
  region    = "nyc1"
  size      = "s-1vcpu-1gb"
  user_data = data.template_file.init.rendered
  # file("scripts/init.sh")
}

# project
resource "digitalocean_project" "e-descargas" {
  name        = var.project_name
  description = "A University Project."
  purpose     = "Web Application"
  environment = "Production"
  resources   = [digitalocean_droplet.droplet.urn, digitalocean_domain.default.urn]
}