# NAPA Project – ASP.NET Core 8.0 Server

NAPA trainee assignment

## Full-Stack Web Application  
**Stack:**  
- Backend: ASP.NET Core 8.0  
- Frontend: Angular with NgRx  

## Project Description  
The project loads tables representing data about ships, countries, ports, and voyages.

- **Ships** are the most independent entities: they have a top speed and a name, and no relationships to other objects. A chart displays the top 6 fastest ships.  
- **Countries** have a name and a boolean value indicating whether they have been visited.  
- **Ports** have a name and belong to a country; each new port must reference an existing country. A pie chart shows the distribution of ports across countries.  
- **Voyages** have a start time, end time, date, and departure/arrival ports. Voyages must reference valid ports and their start time must be earlier than their end time.  

All entities support full CRUD operations.

## Development  
1. Wrote the OpenAPI document.  
2. *(In hindsight, choosing the `name` field as the primary key for ships, countries, and ports was a mistake.)*  
3. Used OpenAPI Generator to scaffold the backend.  
4. Fully implemented ships in both frontend and backend.  
5. With ships charted, the rest of the development was smooth sailing.  
