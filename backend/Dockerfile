FROM golang:1.22.4-alpine

WORKDIR /backend

COPY go.* ./

RUN go mod download

COPY . .

RUN go build -o main .

EXPOSE ${PORT}

CMD ["./main"]