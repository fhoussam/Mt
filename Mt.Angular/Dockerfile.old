#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
RUN apt-get update && apt-get upgrade -y && apt-get -qq -y install curl && apt-get install -y nodejs npm
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet build -c Release -o build

FROM build AS publish
WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o publish

FROM base AS final
WORKDIR /app
COPY --from=publish app/publish .
ENTRYPOINT ["dotnet", "Mt.Angular.dll"]
