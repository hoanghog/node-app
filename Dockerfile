FROM node
# For development environment
# FROM node:16-alpine

LABEL maintainer="martinhoangdev@gmail.com" \
      os="node"


# Bundle app source
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3001


CMD [ "npm", "run", "start"]

# WORKAROUND: when only tail is used, docker run can't be exited using CTRL+C!!
#CMD ["tail", "-f", "/dev/null", "&", "wait", "${!}"]


