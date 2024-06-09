<p align="center">
    <img width=200px height=200px src="./public//ip.png" alt="Project logo">
</p>

<h1 align="center">IP Lookup 🌍</h1>

### Description

The IP Lookup App is a comprehensive tool that allows users to retrieve detailed information about their IP addresses. This application fetches both IPv4 and IPv6 addresses, provides geo-location data, ISP information, and displays the user's location on a map. Additionally, it shows the current time in the user's timezone.

**_Note:_** _: This project is intended for educational and development purposes only._

---

### Deployed URL

[DEMO](https://ip.app3.in)

### Features

1. **IPv4 and IPv6 Retrieval:** Fetch both IPv4 and IPv6 addresses using [ip8](https://ip8.com) API.
2. **Geo-location Data:** Retrieve and display detailed geo-location information such as city, country, region, and postal code.
3. **ISP Information:** Display the Internet Service Provider (ISP) details, including the autonomous system number (ASN).
4. **Location Marker on Map:** Visualize the user's location on a map with an accurate marker.
5. **Current Time Display:** Show the current time based on the user's timezone, with real-time updates.

### How to Set Up Locally

1. **Clone Repository:**

    ```bash
    git clone https://github.com/akashvaghela09/ip-lookup-client.git
    ```

2. **Navigate to Repository:**

    ```bash
    cd ip-lookup-client
    ```

3. **Install Packages:**

    ```bash
    npm i
    ```

4. **Rename and Update Environment File:**

    - Duplicate the example.env file and rename it to .env.
    - Update the `VITE_IP_LOOKUP_SERVICE` variable with backend url in the .env file.

### How to Set Up Backend

-   Refer the backend repository [here](https://github.com/akashvaghela09/ip-lookup-service).

### How to Run

1. **Start the Vite App:**
    ```bash
    npm run dev
    ```

### Contributor

-   [Akash Vaghela](https://linkedin.com/in/akashvaghela09/)

Feel free to contribute and enhance the functionality!
