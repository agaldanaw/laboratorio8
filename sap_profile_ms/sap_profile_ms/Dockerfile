FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 8000

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["sap_profile_ms.csproj", "./"]
RUN dotnet restore "./sap_profile_ms.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "sap_profile_ms.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "sap_profile_ms.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "sap_profile_ms.dll"]
