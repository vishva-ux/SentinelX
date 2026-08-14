FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["src/Microservices/SentinelX.ApiGateway/SentinelX.ApiGateway.csproj", "src/Microservices/SentinelX.ApiGateway/"]
COPY ["src/BuildingBlocks/SentinelX.BuildingBlocks/SentinelX.BuildingBlocks.csproj", "src/BuildingBlocks/SentinelX.BuildingBlocks/"]
RUN dotnet restore "src/Microservices/SentinelX.ApiGateway/SentinelX.ApiGateway.csproj"
COPY . .
WORKDIR "/src/src/Microservices/SentinelX.ApiGateway"
RUN dotnet build "SentinelX.ApiGateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SentinelX.ApiGateway.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SentinelX.ApiGateway.dll"]
