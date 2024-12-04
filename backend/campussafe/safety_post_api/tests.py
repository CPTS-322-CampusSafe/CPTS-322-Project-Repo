from django.test import TestCase

class TestGetPosts(TestCase):
    def test_get_posts(self):
        response = self.client.get("/posts/get_posts/")
        self.assertEqual(response.status_code, 200)