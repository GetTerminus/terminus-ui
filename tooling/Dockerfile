# The image that serves as the base for our custom image
FROM node:8.1.2

# Set the working directory
WORKDIR /usr

# Add a few items to path for yarn/aws
ENV PATH=$PATH:/usr/local/bin:~/.yarn/bin:~/.local/bin

RUN npm --v

# Install yarn and rebuild node-sass
RUN npm i yarn -g && npm rebuild node-sass

# Install global tools
# NOTE: This must be run from bash (not sh) to get access to the correct PATH
RUN ["/bin/bash", "-c", "yarn global add sass-lint"]
