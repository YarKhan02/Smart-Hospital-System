import React, { useEffect, useState } from 'react';
import { Container, Header, Card, CardContent, Error } from '../components/style';

interface Schedule {
  uuid: string;
  doctor_uuid: string;
  appointment_start: string;
  appointment_end: string;
  created_at: string;
}

const SchedulesPage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const backend_url = `https://4567-yarkhan02-smarthospital-3neoo2ie3bm.ws-us116.gitpod.io/schedules`;
      const res = await fetch(backend_url, {
        method: "GET",
      });
      if (res.status === 200) {
        const resJson: Schedule[] = await res.json();
        setSchedules(resJson);
      } else {
        setError(`Error: ${res.status}`);
      }
    } catch (err) {
      setError(`Error: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCardClick = (uuid: string) => {
    setOpenCard(openCard === uuid ? null : uuid);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <Container>
      <Header>Schedules</Header>
      {schedules.map((schedule) => (
        <Card key={schedule.uuid} onClick={() => handleCardClick(schedule.uuid)} isOpen={openCard === schedule.uuid}>
          <div>{schedule.uuid}</div>
          <CardContent isOpen={openCard === schedule.uuid}>
            <strong>Doctor ID:</strong> {schedule.doctor_uuid}<br />
            <strong>Start Time:</strong> {new Date(schedule.appointment_start).toLocaleString()}<br />
            <strong>End Time:</strong> {new Date(schedule.appointment_end).toLocaleString()}<br />
            <strong>Created At:</strong> {new Date(schedule.created_at).toLocaleString()}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default SchedulesPage;