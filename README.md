# AWS CLI Installation and Configuration

## Step 1: Install AWS CLI

```bash
cd /workspace
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
cd $THEIA_WORKSPACE_ROOT
```

## Step 2: Setup IAM User

1. **Login as Root User**: Access the AWS Management Console using the root user credentials.
2. **Create IAM User**: Go to the IAM service and create a new IAM user.
3. **Add User to Admin Group**: Assign the IAM user to the `Admin` group.
4. **Grant Admin Permissions**: Ensure the `Admin` group has full administrative permissions.
5. **Create Access Key**: Generate an access key for the IAM user.

## Step 3: Configure AWS CLI

Run the following command and enter the access key, secret key, region, and output format:

```bash
aws configure
```

## Step 4: Set Up Environment Variables

Set your environment variables using the following commands:

```bash
gp env AWS_ACCESS_KEY_ID=your_access_key_id
gp env AWS_SECRET_ACCESS_KEY=your_secret_access_key
gp env AWS_DEFAULT_REGION=us-west-2
```


# Project Setup

# Install dependencies
npm install

# If TypeScript and React are not installed, add them
npm install typescript @types/react @types/react-dom --save-dev

# Initialize TypeScript
npx tsc --init

## Install Dependencies

To set up the project, run the following command to install the required dependencies:

```bash
npm install tailwindcss@latest clsx tailwind-merge framer-motion