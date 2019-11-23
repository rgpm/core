FROM node:12-slim

# Install chrome for puppeteer tests
# From https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf procps\
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
    && groupadd -r test && useradd -r -g test -G audio,video test \
    && mkdir -p /home/test/Downloads \
    && chown -R test:test /home/test 


WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
COPY webpack.config.js /app
COPY jest-puppeteer.config.js /app
RUN yarn install

COPY src /app/src/
COPY test /app/test/

USER test

ENTRYPOINT ["yarn", "test"]
