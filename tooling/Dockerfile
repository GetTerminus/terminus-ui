# The image that serves as the base for our custom image
FROM markadams/chromium-xvfb

# Set the working directory
WORKDIR /usr

# Add a few items to path for yarn/aws
ENV PATH=$PATH:/usr/local/bin:~/.yarn/bin:~/.local/bin

# AWS CLI needs the PYTHONIOENCODING environment varialbe to handle UTF-8 correctly:
ENV PYTHONIOENCODING=UTF-8

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get update && DEBIAN_FRONTEND="noninteractive" && \
    apt-get install -y --no-install-recommends \
    git \
    nodejs \
    libgconf-2-4 \
    openjdk-7-jre-headless \
    openssh-server \
    python-pip \
    python-dev \
    build-essential  \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip && \
    pip install awscli --upgrade --user

RUN npm i npm@latest -g

RUN npm i yarn -g && npm rebuild node-sass

# Install global tools
# NOTE: This must be run from bash (not sh) to get access to the correct PATH
RUN ["/bin/bash", "-c", "yarn global add sass-lint"]
