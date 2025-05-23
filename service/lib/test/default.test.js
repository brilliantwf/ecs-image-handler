"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = require("../src/default");
test('parseActions empty', () => {
    expect((0, default_1.parseRequest)('', {})).toEqual({
        uri: '',
        actions: [],
    });
    expect((0, default_1.parseRequest)('/example.jpg', {})).toEqual({
        uri: 'example.jpg',
        actions: [],
    });
});
test('parseActions x-oss-process', () => {
    expect((0, default_1.parseRequest)('', {
        'x-oss-process': '',
    })).toEqual({
        uri: '',
        actions: [],
    });
    expect((0, default_1.parseRequest)('', {
        'x-oss-process': '//image/resize,w_100,h_100,m_fixed,limit_0//quality,q_1//',
    })).toEqual({
        uri: '',
        actions: ['image', 'resize,w_100,h_100,m_fixed,limit_0', 'quality,q_1'],
    });
});
test('parseActions custom delimiter', () => {
    expect((0, default_1.parseRequest)('/example.jpg@!ABCabc.-_', {})).toEqual({
        uri: 'example.jpg',
        actions: ['style', 'ABCabc.-_'],
    });
    expect((0, default_1.parseRequest)('/example.jpg!ABCabc.-_', {})).toEqual({
        uri: 'example.jpg',
        actions: ['style', 'ABCabc.-_'],
    });
    expect(() => (0, default_1.parseRequest)('/example.jpg@!  ', {})).toThrowError(/Empty style name/);
});
test('kvstore', async () => {
    const store = (0, default_1.kvstore)();
    expect(await store.get('box100')).toEqual({
        style: 'image/resize,w_100,h_100,m_fixed,limit_0/',
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdGVzdC9kZWZhdWx0LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBdUQ7QUFFdkQsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUM5QixNQUFNLENBQUMsSUFBQSxzQkFBWSxFQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNuQyxHQUFHLEVBQUUsRUFBRTtRQUNQLE9BQU8sRUFBRSxFQUFFO0tBQ1osQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLElBQUEsc0JBQVksRUFBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDL0MsR0FBRyxFQUFFLGFBQWE7UUFDbEIsT0FBTyxFQUFFLEVBQUU7S0FDWixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDdEMsTUFBTSxDQUFDLElBQUEsc0JBQVksRUFBQyxFQUFFLEVBQUU7UUFDdEIsZUFBZSxFQUFFLEVBQUU7S0FDcEIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ1YsR0FBRyxFQUFFLEVBQUU7UUFDUCxPQUFPLEVBQUUsRUFBRTtLQUNaLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxJQUFBLHNCQUFZLEVBQUMsRUFBRSxFQUFFO1FBQ3RCLGVBQWUsRUFBRSwyREFBMkQ7S0FDN0UsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ1YsR0FBRyxFQUFFLEVBQUU7UUFDUCxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsYUFBYSxDQUFDO0tBQ3hFLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUN6QyxNQUFNLENBQUMsSUFBQSxzQkFBWSxFQUFDLHlCQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzFELEdBQUcsRUFBRSxhQUFhO1FBQ2xCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7S0FDaEMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLElBQUEsc0JBQVksRUFBQyx3QkFBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUN6RCxHQUFHLEVBQUUsYUFBYTtRQUNsQixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDO0tBQ2hDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFBLHNCQUFZLEVBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN0RixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7SUFDeEIsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUN4QyxLQUFLLEVBQUUsMkNBQTJDO0tBQ25ELENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyc2VSZXF1ZXN0LCBrdnN0b3JlIH0gZnJvbSAnLi4vc3JjL2RlZmF1bHQnO1xuXG50ZXN0KCdwYXJzZUFjdGlvbnMgZW1wdHknLCAoKSA9PiB7XG4gIGV4cGVjdChwYXJzZVJlcXVlc3QoJycsIHt9KSkudG9FcXVhbCh7XG4gICAgdXJpOiAnJyxcbiAgICBhY3Rpb25zOiBbXSxcbiAgfSk7XG4gIGV4cGVjdChwYXJzZVJlcXVlc3QoJy9leGFtcGxlLmpwZycsIHt9KSkudG9FcXVhbCh7XG4gICAgdXJpOiAnZXhhbXBsZS5qcGcnLFxuICAgIGFjdGlvbnM6IFtdLFxuICB9KTtcbn0pO1xuXG50ZXN0KCdwYXJzZUFjdGlvbnMgeC1vc3MtcHJvY2VzcycsICgpID0+IHtcbiAgZXhwZWN0KHBhcnNlUmVxdWVzdCgnJywge1xuICAgICd4LW9zcy1wcm9jZXNzJzogJycsXG4gIH0pKS50b0VxdWFsKHtcbiAgICB1cmk6ICcnLFxuICAgIGFjdGlvbnM6IFtdLFxuICB9KTtcbiAgZXhwZWN0KHBhcnNlUmVxdWVzdCgnJywge1xuICAgICd4LW9zcy1wcm9jZXNzJzogJy8vaW1hZ2UvcmVzaXplLHdfMTAwLGhfMTAwLG1fZml4ZWQsbGltaXRfMC8vcXVhbGl0eSxxXzEvLycsXG4gIH0pKS50b0VxdWFsKHtcbiAgICB1cmk6ICcnLFxuICAgIGFjdGlvbnM6IFsnaW1hZ2UnLCAncmVzaXplLHdfMTAwLGhfMTAwLG1fZml4ZWQsbGltaXRfMCcsICdxdWFsaXR5LHFfMSddLFxuICB9KTtcbn0pO1xuXG50ZXN0KCdwYXJzZUFjdGlvbnMgY3VzdG9tIGRlbGltaXRlcicsICgpID0+IHtcbiAgZXhwZWN0KHBhcnNlUmVxdWVzdCgnL2V4YW1wbGUuanBnQCFBQkNhYmMuLV8nLCB7fSkpLnRvRXF1YWwoe1xuICAgIHVyaTogJ2V4YW1wbGUuanBnJyxcbiAgICBhY3Rpb25zOiBbJ3N0eWxlJywgJ0FCQ2FiYy4tXyddLFxuICB9KTtcbiAgZXhwZWN0KHBhcnNlUmVxdWVzdCgnL2V4YW1wbGUuanBnIUFCQ2FiYy4tXycsIHt9KSkudG9FcXVhbCh7XG4gICAgdXJpOiAnZXhhbXBsZS5qcGcnLFxuICAgIGFjdGlvbnM6IFsnc3R5bGUnLCAnQUJDYWJjLi1fJ10sXG4gIH0pO1xuICBleHBlY3QoKCkgPT4gcGFyc2VSZXF1ZXN0KCcvZXhhbXBsZS5qcGdAISAgJywge30pKS50b1Rocm93RXJyb3IoL0VtcHR5IHN0eWxlIG5hbWUvKTtcbn0pO1xuXG50ZXN0KCdrdnN0b3JlJywgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzdG9yZSA9IGt2c3RvcmUoKTtcbiAgZXhwZWN0KGF3YWl0IHN0b3JlLmdldCgnYm94MTAwJykpLnRvRXF1YWwoe1xuICAgIHN0eWxlOiAnaW1hZ2UvcmVzaXplLHdfMTAwLGhfMTAwLG1fZml4ZWQsbGltaXRfMC8nLFxuICB9KTtcbn0pOyJdfQ==