<!-- commands to install aws cli -->

cd /workspace
      curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
      unzip awscliv2.zip
      sudo ./aws/install
      cd $THEIA_WORKSPACE_ROOT

<!-- aws configure -->

<!-- setup environment variables -->

gp env AWS_ACCESS_KEY_ID=your_access_key_id
gp env AWS_SECRET_ACCESS_KEY=your_secret_access_key
gp env AWS_DEFAULT_REGION=us-west-2