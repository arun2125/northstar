import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Gumroad webhook for purchase notifications
// Set this URL in Gumroad: Settings > Advanced > Ping URL
export async function POST(request: NextRequest) {
  try {
    // Gumroad sends form-urlencoded data
    const formData = await request.formData();
    
    const email = formData.get('email')?.toString()?.toLowerCase()?.trim();
    const productId = formData.get('product_id')?.toString();
    const saleId = formData.get('sale_id')?.toString();
    const price = formData.get('price')?.toString();
    const sellerEmail = formData.get('seller_id')?.toString();
    
    console.log('Gumroad webhook received:', {
      email,
      productId,
      saleId,
      price,
      sellerEmail
    });

    if (!email) {
      console.error('No email in webhook');
      return NextResponse.json({ error: 'No email provided' }, { status: 400 });
    }

    // Find or create user
    let { data: user } = await supabase
      .from('snapreplies_users')
      .select('id')
      .eq('email', email)
      .single();

    if (!user) {
      // Create user if they purchased before signing up in app
      const { data: newUser, error: createError } = await supabase
        .from('snapreplies_users')
        .insert({ email, is_premium: true })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating user from webhook:', createError);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
      }

      console.log('Created new premium user from webhook:', email);
      return NextResponse.json({ success: true, userId: newUser.id, action: 'created' });
    }

    // Update existing user to premium
    const { error: updateError } = await supabase
      .from('snapreplies_users')
      .update({ is_premium: true })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error upgrading user:', updateError);
      return NextResponse.json({ error: 'Failed to upgrade user' }, { status: 500 });
    }

    console.log('Upgraded user to premium:', email);
    return NextResponse.json({ success: true, userId: user.id, action: 'upgraded' });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Endpoint for manual verification (if user used different email for purchase)
export async function PUT(request: NextRequest) {
  try {
    const { appEmail, purchaseEmail } = await request.json();

    if (!appEmail || !purchaseEmail) {
      return NextResponse.json(
        { error: 'Both emails required' },
        { status: 400 }
      );
    }

    const normalizedPurchaseEmail = purchaseEmail.toLowerCase().trim();
    const normalizedAppEmail = appEmail.toLowerCase().trim();

    // Check if purchase email is premium
    const { data: purchaseUser } = await supabase
      .from('snapreplies_users')
      .select('id, is_premium')
      .eq('email', normalizedPurchaseEmail)
      .single();

    if (!purchaseUser || !purchaseUser.is_premium) {
      return NextResponse.json({
        success: false,
        error: 'No premium purchase found for this email'
      });
    }

    // Upgrade the app user
    const { error: updateError } = await supabase
      .from('snapreplies_users')
      .update({ is_premium: true })
      .eq('email', normalizedAppEmail);

    if (updateError) {
      console.error('Error upgrading via verification:', updateError);
      return NextResponse.json({ error: 'Failed to upgrade' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account upgraded to premium'
    });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
