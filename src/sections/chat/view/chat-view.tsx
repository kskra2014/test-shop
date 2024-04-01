'use client';

import { useEffect, useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useSettingsContext } from 'src/components/settings';
//
import ChatRoom from '../chat-room';
import ChatMessageInput from '../chat-message-input';

// ----------------------------------------------------------------------

export default function ChatView() {
  const router = useRouter();

  const { user } = useMockedUser();

  const settings = useSettingsContext();

  const searchParams = useSearchParams();

  const selectedConversationId = searchParams.get('id') || '';
  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList messages={conversation?.messages} participants={participants} />

      <ChatMessageInput
        recipients={recipients}
        onAddRecipients={handleAddRecipients}
        //
        selectedConversationId={selectedConversationId}
        disabled={!recipients.length && !selectedConversationId}
      />
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Chat
      </Typography>

      <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
        {renderNav}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {renderMessages}

            {details && <ChatRoom conversation={conversation} participants={participants} />}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
