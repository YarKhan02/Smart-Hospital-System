FROM golang:1.22.4-alpine

WORKDIR /backend

RUN go install github.com/air-verse/air@latest

COPY go.* ./
RUN go mod download

COPY . .

EXPOSE 8080

CMD [ "air", "-c", ".air.toml" ]