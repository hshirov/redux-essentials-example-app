import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';
import { client } from '../../api/client';

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        allNotificationsRead(state) {
            Object.values(state.entities).forEach(notification => {
                notification.read = true;
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            notificationsAdapter.upsertMany(state, action.payload);
            Object.values(state.entities).forEach(notification => {
                notification.isNew = !notification.read;
            })
        });
    }
});

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState }) => {
        const allNotifications = selectAllNotifications(getState());
        const [latestNotification] = allNotifications;
        const latestTimestamp = latestNotification ? latestNotification.date : '';
        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`
        );

        return response.data;
    }
);

export const { allNotificationsRead } = notificationSlice.actions;

export default notificationSlice.reducer;

export const { selectAll: selectAllNotifications } =
    notificationsAdapter.getSelectors(state => state.notifications);
