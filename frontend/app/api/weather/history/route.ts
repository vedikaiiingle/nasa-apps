import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const date = searchParams.get('date');
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!lat || !lon || !date) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    // Convert date to Unix timestamp (UTC)
    const dateObj = new Date(date);
    const timestamp = Math.floor(dateObj.getTime() / 1000);
    
    // Get timezone offset in seconds
    const timezoneOffset = dateObj.getTimezoneOffset() * 60;
    
    // Calculate the start and end of the selected day in UTC
    const startOfDay = timestamp - (timestamp % 86400) - timezoneOffset;
    const endOfDay = startOfDay + 86400;

    // Get historical weather data for the selected day
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${startOfDay}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch historical weather data');
    }

    const data = await response.json();
    
    // Find the closest weather data to the selected time
    const selectedTime = timestamp + timezoneOffset;
    let closestData = data.hourly[0];
    let minDiff = Math.abs(selectedTime - closestData.dt);
    
    for (const hourData of data.hourly) {
      const diff = Math.abs(selectedTime - hourData.dt);
      if (diff < minDiff) {
        minDiff = diff;
        closestData = hourData;
      }
    }

    return NextResponse.json({
      temp: closestData.temp,
      humidity: closestData.humidity,
      wind_speed: closestData.wind_speed,
      weather: [{
        main: closestData.weather[0].main,
        description: closestData.weather[0].description,
        icon: closestData.weather[0].icon
      }],
      rain: closestData.rain ? { '1h': closestData.rain['1h'] || 0 } : undefined,
      dt: closestData.dt
    });
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historical weather data' },
      { status: 500 }
    );
  }
}
