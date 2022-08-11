import React from 'react';
import {
  Container, styled, Typography, Box, Link,
} from '@mui/material';
import TypographyHeader from '../components/TypographyHeader';

const Paragraph = styled(Typography)(() => ({
  marginBottom: '2rem',
}));

const ContactInfoHeader = styled(TypographyHeader)(() => ({
  marginBottom: 0,
  marginTop: '8px',
}));

const ContactInfoField = styled(Typography)({
  paddingLeft: '3rem',
});

function About() {
  return (
    <Box sx={{
      width: '100%', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <Container maxWidth="md">
        <Box sx={{ marginBottom: '4rem' }}>
          <TypographyHeader variant="h3">
            SNiC
          </TypographyHeader>
          <Paragraph variant="body1">
            SNiC is an acronym for Stichting Nationaal informatica Congres (Foundation National
            Computer Science Conference). This organisation was established in 2004 with the
            purpose of stimulating the interest in IT knowledge, IT applications and the business
            side of IT. Every year, a conference with an IT related subject is organised. For
            each conference one study association is chosen to take care of the organsisation.
          </Paragraph>
          <Paragraph variant="body1">
            Visitors are enthusiastic Computer Science and Artificial Intelligence bachelor and
            master students from all over the country. Over the past years the congress has grown
            considerably. Where in 2017 the congress was visited by 450 students, we expect around
            700 visitors in 2021. Various talks will be held at the congress by speakers from both
            the business world and the academic world. The students are challenged to dive into a
            specific topic from different perspectives. We want to inspire them and invite them to
            think further than their current views.
          </Paragraph>
          <Paragraph variant="body1">
            This year&apos;s SNiC is organized by students from
            {' '}
            <Link href="https://www.gewis.nl" variant="inherit">GEWIS</Link>
            .
          </Paragraph>
        </Box>
        <Box sx={{
          display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <TypographyHeader variant="h3">Contact us</TypographyHeader>
          <Container maxWidth="xs" sx={() => ({ textAlign: 'left' })}>
            <ContactInfoHeader variant="h5">General Email</ContactInfoHeader>
            <ContactInfoField><Link href="mailto:info@celerit.nl">info@celerit.nl</Link></ContactInfoField>
            <ContactInfoHeader variant="h5">Business Email</ContactInfoHeader>
            <ContactInfoField><Link href="mailto:partners@celerit.nl">partners@celerit.nl</Link></ContactInfoField>
            <ContactInfoHeader variant="h5">Phone</ContactInfoHeader>
            <ContactInfoField>(+31) (040) 247 2815</ContactInfoField>
            <ContactInfoHeader variant="h5">Address</ContactInfoHeader>
            <ContactInfoField sx={{ whiteSpace: 'pre-wrap' }}>
              GEWIS t.a.v. CelerIT
              <br />
              MF 3.155
              <br />
              Postbus 513
              <br />
              Eindhoven, 5600MB
              <br />
            </ContactInfoField>
          </Container>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
