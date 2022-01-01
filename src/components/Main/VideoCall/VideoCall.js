/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// /* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, Dimensions, StatusBar} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import CountdownTimer from '../common/CountdownTimer/CountDownTimer';
import axios from 'axios';
import {useSelector} from 'react-redux';
let windowHeight = Dimensions.get('window').height;
import { BASE_URL } from '../../../globals/constant';

function VideoCall(props) {
  const current = useSelector(state => state.auth.current);
  const axiosInstance1 = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + current.tokens.access.token,
    },
  });

  useEffect(() => {
    // StatusBar.setHidden(false, 'none'); // don't remove this
    // StatusBar.setTranslucent(false); // don't remove this.
    // StatusBar.setBackgroundColor('#000000'); // you can remove
    // StatusBar.setBarStyle('light-content'); // you can remove

    const url = 'https://meet.jit.si/songokuminhthong';

    // const url = `https://sandbox.app.lettutor.com/call/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiZW1haWwiOiJzdHVkZW50QGxldHR1dG9yLmNvbSIsIm5hbWUiOiJKb2huIFhpbmEifX0sInJvb20iOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgtNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhIiwicm9vbU5hbWUiOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgtNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhIiwidXNlckNhbGwiOnsiaWQiOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgiLCJlbWFpbCI6InN0dWRlbnRAbGV0dHV0b3IuY29tIiwibmFtZSI6IkpvaG4gWGluYSIsImF2YXRhciI6Imh0dHBzOi8vc2FuZGJveC5hcGkubGV0dHV0b3IuY29tL2F2YXRhci9mNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjhhdmF0YXIxNjQwNzAwNzEzMzgxLmpwZyIsImNvdW50cnkiOiJWTiIsInBob25lIjoiODQyNDk5OTk2NTA4IiwibGFuZ3VhZ2UiOiJFbmdsaXNoIiwiYmlydGhkYXkiOiIxOTk3LTA0LTMwIiwiaXNBY3RpdmF0ZWQiOnRydWUsInJlcXVpcmVOb3RlIjpudWxsLCJsZXZlbCI6IklOVEVSTUVESUFURSIsImlzUGhvbmVBY3RpdmF0ZWQiOnRydWUsInRpbWV6b25lIjo3fSwidXNlckJlQ2FsbGVkIjp7ImlkIjoiNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhIiwiZW1haWwiOiJ0ZWFjaGVyQGxldHR1dG9yLmNvbSIsIm5hbWUiOiJLZWVnYW4iLCJhdmF0YXIiOiJodHRwczovL2FwaS5hcHAubGV0dHV0b3IuY29tL2F2YXRhci80ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWFhdmF0YXIxNjI3OTEzMDE1ODUwLjAwIiwiY291bnRyeSI6IlpBIiwicGhvbmUiOiIwOTg3NjU0MzIxIiwibGFuZ3VhZ2UiOm51bGwsImJpcnRoZGF5IjoiMTk5OS0xMi0wMSIsImlzQWN0aXZhdGVkIjp0cnVlLCJ0dXRvckluZm8iOnsiaWQiOiI2Y2E1YzA5Mi03NmVhLTRlNzItOWM2ZS0wNWUyMjM5YWEzM2IiLCJ1c2VySWQiOiI0ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWEiLCJ2aWRlbyI6Imh0dHBzOi8vYXBpLmFwcC5sZXR0dXRvci5jb20vdmlkZW8vNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhdmlkZW8xNjI3OTEzMDE1ODcxLm1wNCIsImJpbyI6IkkgYW0gcGFzc2lvbmF0ZSBhYm91dCBydW5uaW5nIGFuZCBmaXRuZXNzLCBJIG9mdGVuIGNvbXBldGUgaW4gdHJhaWwvbW91bnRhaW4gcnVubmluZyBldmVudHMgYW5kIEkgbG92ZSBwdXNoaW5nIG15c2VsZi4gSSBhbSB0cmFpbmluZyB0byBvbmUgZGF5IHRha2UgcGFydCBpbiB1bHRyYS1lbmR1cmFuY2UgZXZlbnRzLiBJIGFsc28gZW5qb3kgd2F0Y2hpbmcgcnVnYnkgb24gdGhlIHdlZWtlbmRzLCByZWFkaW5nIGFuZCB3YXRjaGluZyBwb2RjYXN0cyBvbiBZb3V0dWJlLiBNeSBtb3N0IG1lbW9yYWJsZSBsaWZlIGV4cGVyaWVuY2Ugd291bGQgYmUgbGl2aW5nIGluIGFuZCB0cmF2ZWxpbmcgYXJvdW5kIFNvdXRoZWFzdCBBc2lhLiIsImVkdWNhdGlvbiI6IkJBIiwiZXhwZXJpZW5jZSI6IkkgaGF2ZSBtb3JlIHRoYW4gMTAgeWVhcnMgb2YgdGVhY2hpbmcgZW5nbGlzaCBleHBlcmllbmNlIiwicHJvZmVzc2lvbiI6IkVuZ2xpc2ggdGVhY2hlciIsImFjY2VudCI6bnVsbCwidGFyZ2V0U3R1ZGVudCI6IkludGVybWVkaWF0ZSIsImludGVyZXN0cyI6IiBJIGxvdmVkIHRoZSB3ZWF0aGVyLCB0aGUgc2NlbmVyeSBhbmQgdGhlIGxhaWQtYmFjayBsaWZlc3R5bGUgb2YgdGhlIGxvY2Fscy4iLCJsYW5ndWFnZXMiOiJlbiIsInNwZWNpYWx0aWVzIjoiYnVzaW5lc3MtZW5nbGlzaCxjb252ZXJzYXRpb25hbC1lbmdsaXNoLGVuZ2xpc2gtZm9yLWtpZHMsaWVsdHMsdG9laWMiLCJyZXN1bWUiOm51bGwsImlzQWN0aXZhdGVkIjp0cnVlLCJpc05hdGl2ZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMS0wOC0wMlQxNDowMzozNi4zMjBaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0wOFQxNzo0Nzo0OC45MjlaIn0sInJlcXVpcmVOb3RlIjpudWxsLCJsZXZlbCI6IkFEVkFOQ0VEIiwiaXNQaG9uZUFjdGl2YXRlZCI6bnVsbCwidGltZXpvbmUiOjd9LCJpc1R1dG9yIjpmYWxzZSwic3RhcnRUaW1lIjoxNjQxMDA0MjAwMDAwLCJlbmRTZXNzaW9uIjoxNjQxMDA1NzAwMDAwLCJ0aW1lSW5Sb29tIjoxODAwLCJib29raW5nSWQiOiIwYjBjM2E2MS1lNDA1LTRmN2MtODk0YS0yN2Y5ZTBlOTMzZjIiLCJpYXQiOjE2NDA5OTY1ODUsImV4cCI6MTY0MTAyMDA5OSwiYXVkIjoibGl2ZXR1dG9yIiwiaXNzIjoibGl2ZXR1dG9yIiwic3ViIjoiaHR0cHM6Ly9tZWV0LnR1dG9yaW5nLmxldHN0dWR5LmlvIn0.KYLsLsEpYSTuURXYgc0hAoA1jIzHiPa-Kmm4QOhOCv8`;
    //const url = `https://sandbox.app.lettutor.com/call/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiZW1haWwiOiJzdHVkZW50QGxldHR1dG9yLmNvbSIsIm5hbWUiOiJKb2huIFhpbmEifX0sInJvb20iOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgtNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhIiwicm9vbU5hbWUiOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgtNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhIiwidXNlckNhbGwiOnsiaWQiOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgiLCJlbWFpbCI6InN0dWRlbnRAbGV0dHV0b3IuY29tIiwibmFtZSI6IkpvaG4gWGluYSIsImF2YXRhciI6Imh0dHBzOi8vc2FuZGJveC5hcGkubGV0dHV0b3IuY29tL2F2YXRhci9mNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjhhdmF0YXIxNjQwNzAwNzEzMzgxLmpwZyIsImNvdW50cnkiOiJWTiIsInBob25lIjoiODQyNDk5OTk2NTA4IiwibGFuZ3VhZ2UiOiJFbmdsaXNoIiwiYmlydGhkYXkiOiIxOTk3LTA0LTMwIiwiaXNBY3RpdmF0ZWQiOnRydWUsInJlcXVpcmVOb3RlIjpudWxsLCJsZXZlbCI6IklOVEVSTUVESUFURSIsImlzUGhvbmVBY3RpdmF0ZWQiOnRydWUsInRpbWV6b25lIjo3fSwidXNlckJlQ2FsbGVkIjp7ImlkIjoiNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhIiwiZW1haWwiOiJ0ZWFjaGVyQGxldHR1dG9yLmNvbSIsIm5hbWUiOiJLZWVnYW4iLCJhdmF0YXIiOiJodHRwczovL2FwaS5hcHAubGV0dHV0b3IuY29tL2F2YXRhci80ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWFhdmF0YXIxNjI3OTEzMDE1ODUwLjAwIiwiY291bnRyeSI6IlpBIiwicGhvbmUiOiIwOTg3NjU0MzIxIiwibGFuZ3VhZ2UiOm51bGwsImJpcnRoZGF5IjoiMTk5OS0xMi0wMSIsImlzQWN0aXZhdGVkIjp0cnVlLCJ0dXRvckluZm8iOnsiaWQiOiI2Y2E1YzA5Mi03NmVhLTRlNzItOWM2ZS0wNWUyMjM5YWEzM2IiLCJ1c2VySWQiOiI0ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWEiLCJ2aWRlbyI6Imh0dHBzOi8vYXBpLmFwcC5sZXR0dXRvci5jb20vdmlkZW8vNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhdmlkZW8xNjI3OTEzMDE1ODcxLm1wNCIsImJpbyI6IkkgYW0gcGFzc2lvbmF0ZSBhYm91dCBydW5uaW5nIGFuZCBmaXRuZXNzLCBJIG9mdGVuIGNvbXBldGUgaW4gdHJhaWwvbW91bnRhaW4gcnVubmluZyBldmVudHMgYW5kIEkgbG92ZSBwdXNoaW5nIG15c2VsZi4gSSBhbSB0cmFpbmluZyB0byBvbmUgZGF5IHRha2UgcGFydCBpbiB1bHRyYS1lbmR1cmFuY2UgZXZlbnRzLiBJIGFsc28gZW5qb3kgd2F0Y2hpbmcgcnVnYnkgb24gdGhlIHdlZWtlbmRzLCByZWFkaW5nIGFuZCB3YXRjaGluZyBwb2RjYXN0cyBvbiBZb3V0dWJlLiBNeSBtb3N0IG1lbW9yYWJsZSBsaWZlIGV4cGVyaWVuY2Ugd291bGQgYmUgbGl2aW5nIGluIGFuZCB0cmF2ZWxpbmcgYXJvdW5kIFNvdXRoZWFzdCBBc2lhLiIsImVkdWNhdGlvbiI6IkJBIiwiZXhwZXJpZW5jZSI6IkkgaGF2ZSBtb3JlIHRoYW4gMTAgeWVhcnMgb2YgdGVhY2hpbmcgZW5nbGlzaCBleHBlcmllbmNlIiwicHJvZmVzc2lvbiI6IkVuZ2xpc2ggdGVhY2hlciIsImFjY2VudCI6bnVsbCwidGFyZ2V0U3R1ZGVudCI6IkludGVybWVkaWF0ZSIsImludGVyZXN0cyI6IiBJIGxvdmVkIHRoZSB3ZWF0aGVyLCB0aGUgc2NlbmVyeSBhbmQgdGhlIGxhaWQtYmFjayBsaWZlc3R5bGUgb2YgdGhlIGxvY2Fscy4iLCJsYW5ndWFnZXMiOiJlbiIsInNwZWNpYWx0aWVzIjoiYnVzaW5lc3MtZW5nbGlzaCxjb252ZXJzYXRpb25hbC1lbmdsaXNoLGVuZ2xpc2gtZm9yLWtpZHMsaWVsdHMsdG9laWMiLCJyZXN1bWUiOm51bGwsImlzQWN0aXZhdGVkIjp0cnVlLCJpc05hdGl2ZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMS0wOC0wMlQxNDowMzozNi4zMjBaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0wOFQxNzo0Nzo0OC45MjlaIn0sInJlcXVpcmVOb3RlIjpudWxsLCJsZXZlbCI6IkFEVkFOQ0VEIiwiaXNQaG9uZUFjdGl2YXRlZCI6bnVsbCwidGltZXpvbmUiOjd9LCJpc1R1dG9yIjpmYWxzZSwic3RhcnRUaW1lIjoxNjQxMDI0MDAwMDAwLCJlbmRTZXNzaW9uIjoxNjQxMDI1NTAwMDAwLCJ0aW1lSW5Sb29tIjoxODAwLCJib29raW5nSWQiOiI1MGE0MWMzOC05MDhlLTRkMjEtOTk2OC0wY2Q5ZGU5ZmM1YjIiLCJpYXQiOjE2NDEwMDY0NTIsImV4cCI6MTY0MTAzOTg5OSwiYXVkIjoibGl2ZXR1dG9yIiwiaXNzIjoibGl2ZXR1dG9yIiwic3ViIjoiaHR0cHM6Ly9tZWV0LnR1dG9yaW5nLmxldHN0dWR5LmlvIn0.VFsXKS2rKfkwLoyVazNlYcQJFpENd_IXAO9Y3je6juM`
    const userInfo = {
      displayName: 'JohnXina',
      email: 'student@lettutor.com',
      password: '123456',
      // avatar: 'https:/gravatar.com/avatar/abc123',
      avatar:
        'https://i.pinimg.com/170x/d6/13/72/d6137245169ab62c45b5879ddd41d36d.jpg',
      //avatar: 'https://gamek.mediacdn.vn/zoom/220_160/133514250583805952/2021/6/26/avata-16246861354471549893846.jpg',
    };
    JitsiMeet.call(url, userInfo, '123456');
    
    // const room = 'f569c202-7bbf-4620-af77-ecc1419a6b28-4d54d3d7-d2a9-42e5-97a2-5ed38af5789a';
    // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiZW1haWwiOiJzdHVkZW50QGxldHR1dG9yLmNvbSIsIm5hbWUiOiJKb2huIFhpbmEifX0sInJvb20iOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgtNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhIiwicm9vbU5hbWUiOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgtNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhIiwidXNlckNhbGwiOnsiaWQiOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgiLCJlbWFpbCI6InN0dWRlbnRAbGV0dHV0b3IuY29tIiwibmFtZSI6IkpvaG4gWGluYSIsImF2YXRhciI6Imh0dHBzOi8vc2FuZGJveC5hcGkubGV0dHV0b3IuY29tL2F2YXRhci9mNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjhhdmF0YXIxNjQwNzAwNzEzMzgxLmpwZyIsImNvdW50cnkiOiJWTiIsInBob25lIjoiODQyNDk5OTk2NTA4IiwibGFuZ3VhZ2UiOiJFbmdsaXNoIiwiYmlydGhkYXkiOiIxOTk3LTA0LTMwIiwiaXNBY3RpdmF0ZWQiOnRydWUsInJlcXVpcmVOb3RlIjpudWxsLCJsZXZlbCI6IklOVEVSTUVESUFURSIsImlzUGhvbmVBY3RpdmF0ZWQiOnRydWUsInRpbWV6b25lIjo3fSwidXNlckJlQ2FsbGVkIjp7ImlkIjoiNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhIiwiZW1haWwiOiJ0ZWFjaGVyQGxldHR1dG9yLmNvbSIsIm5hbWUiOiJLZWVnYW4iLCJhdmF0YXIiOiJodHRwczovL2FwaS5hcHAubGV0dHV0b3IuY29tL2F2YXRhci80ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWFhdmF0YXIxNjI3OTEzMDE1ODUwLjAwIiwiY291bnRyeSI6IlpBIiwicGhvbmUiOiIwOTg3NjU0MzIxIiwibGFuZ3VhZ2UiOm51bGwsImJpcnRoZGF5IjoiMTk5OS0xMi0wMSIsImlzQWN0aXZhdGVkIjp0cnVlLCJ0dXRvckluZm8iOnsiaWQiOiI2Y2E1YzA5Mi03NmVhLTRlNzItOWM2ZS0wNWUyMjM5YWEzM2IiLCJ1c2VySWQiOiI0ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWEiLCJ2aWRlbyI6Imh0dHBzOi8vYXBpLmFwcC5sZXR0dXRvci5jb20vdmlkZW8vNGQ1NGQzZDctZDJhOS00MmU1LTk3YTItNWVkMzhhZjU3ODlhdmlkZW8xNjI3OTEzMDE1ODcxLm1wNCIsImJpbyI6IkkgYW0gcGFzc2lvbmF0ZSBhYm91dCBydW5uaW5nIGFuZCBmaXRuZXNzLCBJIG9mdGVuIGNvbXBldGUgaW4gdHJhaWwvbW91bnRhaW4gcnVubmluZyBldmVudHMgYW5kIEkgbG92ZSBwdXNoaW5nIG15c2VsZi4gSSBhbSB0cmFpbmluZyB0byBvbmUgZGF5IHRha2UgcGFydCBpbiB1bHRyYS1lbmR1cmFuY2UgZXZlbnRzLiBJIGFsc28gZW5qb3kgd2F0Y2hpbmcgcnVnYnkgb24gdGhlIHdlZWtlbmRzLCByZWFkaW5nIGFuZCB3YXRjaGluZyBwb2RjYXN0cyBvbiBZb3V0dWJlLiBNeSBtb3N0IG1lbW9yYWJsZSBsaWZlIGV4cGVyaWVuY2Ugd291bGQgYmUgbGl2aW5nIGluIGFuZCB0cmF2ZWxpbmcgYXJvdW5kIFNvdXRoZWFzdCBBc2lhLiIsImVkdWNhdGlvbiI6IkJBIiwiZXhwZXJpZW5jZSI6IkkgaGF2ZSBtb3JlIHRoYW4gMTAgeWVhcnMgb2YgdGVhY2hpbmcgZW5nbGlzaCBleHBlcmllbmNlIiwicHJvZmVzc2lvbiI6IkVuZ2xpc2ggdGVhY2hlciIsImFjY2VudCI6bnVsbCwidGFyZ2V0U3R1ZGVudCI6IkludGVybWVkaWF0ZSIsImludGVyZXN0cyI6IiBJIGxvdmVkIHRoZSB3ZWF0aGVyLCB0aGUgc2NlbmVyeSBhbmQgdGhlIGxhaWQtYmFjayBsaWZlc3R5bGUgb2YgdGhlIGxvY2Fscy4iLCJsYW5ndWFnZXMiOiJlbiIsInNwZWNpYWx0aWVzIjoiYnVzaW5lc3MtZW5nbGlzaCxjb252ZXJzYXRpb25hbC1lbmdsaXNoLGVuZ2xpc2gtZm9yLWtpZHMsaWVsdHMsdG9laWMiLCJyZXN1bWUiOm51bGwsImlzQWN0aXZhdGVkIjp0cnVlLCJpc05hdGl2ZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMS0wOC0wMlQxNDowMzozNi4zMjBaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0wOFQxNzo0Nzo0OC45MjlaIn0sInJlcXVpcmVOb3RlIjpudWxsLCJsZXZlbCI6IkFEVkFOQ0VEIiwiaXNQaG9uZUFjdGl2YXRlZCI6bnVsbCwidGltZXpvbmUiOjd9LCJpc1R1dG9yIjpmYWxzZSwic3RhcnRUaW1lIjoxNjQxMDA0MjAwMDAwLCJlbmRTZXNzaW9uIjoxNjQxMDA1NzAwMDAwLCJ0aW1lSW5Sb29tIjoxODAwLCJib29raW5nSWQiOiIwYjBjM2E2MS1lNDA1LTRmN2MtODk0YS0yN2Y5ZTBlOTMzZjIiLCJpYXQiOjE2NDA5OTY1ODUsImV4cCI6MTY0MTAyMDA5OSwiYXVkIjoibGl2ZXR1dG9yIiwiaXNzIjoibGl2ZXR1dG9yIiwic3ViIjoiaHR0cHM6Ly9tZWV0LnR1dG9yaW5nLmxldHN0dWR5LmlvIn0.KYLsLsEpYSTuURXYgc0hAoA1jIzHiPa-Kmm4QOhOCv8`
    
    // axiosInstance1.post(`https://meet.lettutor.com/http-bind?room=${room}&token=${token}`, {
    //   room: room,
    //   token: token
    // }).then(res => console.log(JSON.stringify(res)));

    // return () => {
    //   JitsiMeet.endCall();
    // };
  }, []);

  useEffect(() => {
    return () => {
      console.log('end call nè');
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log('Meeting Ended');
  }

  function onConferenceJoined(nativeEvent) {
    console.log('Meeting Joined');
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log('Meeting Before Join');
  }
  return (
        <View
    // style={{
    //   flex: 1,
    //   height: '100%',
    //   width: '100%',
    //   backgroundColor: 'black',
    // }}
    >
      <View
        style={{
          height: 60,
          position: 'absolute',
          marginTop: 120,
          alignSelf: 'center',
          elevation: 100,
        }}>
        {/* <CountdownTimer
          timeStart={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
        /> */}
        {new Date().getTime() <
          props.route.params.arrScheduleClass.scheduleDetailInfo.scheduleInfo
            .startTimestamp && (
          <CountdownTimer
            timeStart={
              new Date(
                props.route.params.arrScheduleClass.scheduleDetailInfo.scheduleInfo.startTimestamp,
              )
            }
          />
        )}
      </View>
      <JitsiMeetView
        onConferenceTerminated={e => onConferenceTerminated(e)}
        onConferenceJoined={e => onConferenceJoined(e)}
        onConferenceWillJoin={e => onConferenceWillJoin(e)}
        style={{
          //flex: 1,
          height: windowHeight,
          width: '100%',
          backgroundColor: 'black',
        }}
      />
    </View>
  );
}
export default VideoCall;
