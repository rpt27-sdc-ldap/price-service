import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 100,
      maxVUs: 1000
    }
  }
}

export default function () {
  let randomId = Math.floor(Math.random() * 9999999)
  http.get(`http://localhost:3000/?bookId=${randomId}`);
  sleep(1);
}