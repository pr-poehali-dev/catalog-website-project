import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Приём заявок с формы обратной связи ЯрЛавка76"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name = (body.get("name") or "").strip()
    phone = (body.get("phone") or "").strip()
    message = (body.get("message") or "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "name and phone are required"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO contact_requests (name, phone, message) VALUES (%s, %s, %s) RETURNING id",
        (name, phone, message),
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"ok": True, "id": row[0]}),
    }