FROM nginx:1.17.1-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
Run npm install
RUN npm i -g json-server
RUN npm run build --prod
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/EmployeeForm /usr/share/nginx/html
CMD ["npm", "start", "json-server", "-w", "db.json", "-p", "3000"]
EXPOSE 3000