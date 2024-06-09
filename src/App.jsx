import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { Map, Marker } from "pigeon-maps";
import { Table } from "./components/Table";
import { Row } from "./components/Row";
import { DateTimeDisplay } from "./components/DateTimeDisplay";
import { Skeleton } from "./components/Skeleton";

const ipLookupUrl = import.meta.env.VITE_IP_LOOKUP_SERVICE;

function App() {
    const [ipv4, setIPV4] = useState("");
    const [ipv6, setIPV6] = useState("");
    const [geoData, setGeoData] = useState({});
    const [ispData, setIspData] = useState({});
    const [timezoneString, setTimezoneString] = useState("");
    const [locationString, setLocationString] = useState("");

    const handleIPLookup = async () => {
        let ipv4Address = "";
        let ipv6Address = "";
        let ip8Response = {};

        try {
            const ipv4Response = await axios.get("https://ip4.ip8.com");
            ipv4Address = ipv4Response.data;
        } catch (err) {
            console.log("Failed to fetch IPv4 address:", err);
        }

        try {
            const response = await axios.get(
                `${ipLookupUrl}/ip/${ipv4Address || ipv6Address}`
            );
            ip8Response = { ...response.data };
        } catch (err) {
            console.log("Failed to fetch geo data:", err);
        }

        const geoip = ip8Response?.geoip;
        setIPV4(ipv4Address);
        setGeoData(geoip || {});
        setIspData(ip8Response?.isp || {});
        setTimezoneString(geoip?.timezone || "");
        setLocationString(`${geoip?.city}, ${geoip?.country}`);

        try {
            const ipv6Response = await axios
                .get("https://ip6.ip8.com")
                .catch((err) => {
                    console.log("ip6 eeror: ", err);
                });
            ipv6Address = ipv6Response.data;
        } catch (err) {
            console.log("Failed to fetch IPv6 address:", err);
        }

        setIPV6(ipv6Address || " - ");
    };

    useEffect(() => {
        handleIPLookup();
    }, []);

    return (
        <div className="bg-white h-screen w-full flex flex-col justify-start items-center p-2 py-8 lg:p-12 gap-12">
            <div className="w-11/12 md:w-4/5 lg:h-full flex flex-col lg:flex-row gap-5">
                <div className="lg:w-2/6 flex flex-col gap-4">
                    <div className="border-[1px] h-fit shadow-md rounded-md flex flex-col gap-12 py-4">
                        <div className="">
                            <div className=" mx-2 px-2 flex justify-between items-baseline">
                                <p className="font-bold text-xl">
                                    My IP Address is
                                </p>
                            </div>
                            <Table label="">
                                <Row label="IPv4" value={ipv4} />
                                <Row label="IPv6" value={ipv6} />
                            </Table>
                        </div>

                        <div className="relative">
                            <Table label="Location">
                                <Row label="City" value={geoData.city} />
                                <Row label="Country" value={geoData.country} />
                                <Row label="Region" value={geoData.region} />
                                <Row
                                    label="Continent"
                                    value={geoData.timezone?.split("/")[0]}
                                />
                                <Row
                                    label="Postal Code"
                                    value={geoData.postalcode}
                                />
                                <Row
                                    label="Time Zone"
                                    value={geoData.timezone}
                                />
                            </Table>
                            <div className="absolute top-0 right-4 flex items-baseline gap-4">
                                <label className="flex gap-2 text-sm">
                                    {geoData.city && geoData.country ? (
                                        <>
                                            <p>{geoData.city} /</p>
                                            <p>{geoData.country}</p>
                                        </>
                                    ) : (
                                        <Skeleton className="h-4 w-40 rounded-md" />
                                    )}
                                </label>
                                {geoData?.isocode && (
                                    <ReactCountryFlag
                                        style={{ fontSize: "1.5rem" }}
                                        countryCode={geoData?.isocode}
                                    />
                                )}
                            </div>
                        </div>

                        <Table label="Provider">
                            <Row label="ISP" value={ispData.isp} />
                            <Row
                                label="ASN"
                                value={ispData.autonomousSystemNumber}
                            />
                        </Table>
                    </div>
                    <div className="border-[1px] h-full shadow-md rounded-md p-4 flex flex-col gap-2">
                        <DateTimeDisplay
                            timeZone={
                                timezoneString
                                    ? timezoneString
                                    : "America/New_York"
                            }
                            location={
                                locationString
                                    ? locationString
                                    : "New York, United States"
                            }
                        />
                    </div>
                </div>

                <div className="border-[1px] lg:w-4/6 h-[400px] lg:h-full shadow-md rounded-md flex items-center">
                    {geoData?.longitude && geoData?.latitude ? (
                        <div className="w-full h-full p-4 rounded-md">
                            <Map
                                defaultCenter={[
                                    geoData?.latitude,
                                    geoData?.longitude,
                                ]}
                                defaultZoom={8}
                            >
                                <Marker
                                    width={50}
                                    anchor={[
                                        geoData?.latitude,
                                        geoData?.longitude,
                                    ]}
                                />
                            </Map>
                        </div>
                    ) : (
                        <div className="w-full h-full p-4">
                            <Skeleton className="h-full w-full rounded-md" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
